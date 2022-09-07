import bcrypt from 'bcrypt';
import express from 'express';
import joi from 'joi';
import mysql from 'mysql2/promise';
import { DB_CONFIG } from '../config/dbConfig.js';

export const router = express.Router();

const registerSchema = joi.object({
    email: joi
        .string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
        })
        .required(),
    username: joi.string().required(),
    password: joi.string().required(),
});

router.post('/auth/register', async (req, res) => {
    const { email, username, password } = req.body;
    try {
        try {
            await registerSchema.validateAsync({ email, username, password });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error: 'Bad request',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const connection = await mysql.createConnection(DB_CONFIG);
        const [rows] = await connection.query(
            `SELECT * FROM users WHERE email = "${email}" or username = "${username}"`,
        );

        if (rows.length > 0) {
            return res.status(409).json({
                status: 409,
                error: 'Already exist',
            });
        }

        const [response] = await connection.query('INSERT INTO users SET ?', {
            email,
            username,
            password: hashedPassword,
        });
        await connection.end();

        return res.json(response);
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error,
        });
    }
});

const loginSchema = joi.object({
    email: joi
        .string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
        })
        .required(),
    password: joi.string().required(),
});

router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        try {
            await loginSchema.validateAsync({ email, password });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error: 'Bad request',
            });
        }

        const connection = await mysql.createConnection(DB_CONFIG);
        const [[user]] = await connection.query(
            `SELECT * FROM users WHERE email = "${email}"`,
        );
        await connection.end();

        if (!user) {
            return res.status(404).json({
                status: 404,
                error: 'Not found',
            });
        }

        const compare = await bcrypt.compare(password, user.password);
        if (!compare) {
            return res.status(403).json({
                status: 400,
                error: 'Bad request',
                message: 'Email or password is incorrect',
            });
        }

        return res.json({
            authorized: true,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error,
        });
    }
});
