import express from 'express';
import mysql from 'mysql2/promise';
import { DB_CONFIG } from '../config/dbConfig.js';

export const router = express.Router();

router.get('/', async (_, res) => {
    try {
        const connection = await mysql.createConnection(DB_CONFIG);
        const [rows] = await connection.query(`SELECT * FROM events`);
        res.send(rows);
        await connection.end();
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const connection = await mysql.createConnection(DB_CONFIG);
        const [rows] = await connection.query(
            `SELECT * FROM events WHERE id = ${req.params.id}`,
        );
        res.send(rows[0]);
        await connection.end();
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, date } = req.body;
        const parsedDate = date.substring(0, 19);
        const connection = await mysql.createConnection(DB_CONFIG);
        const [response] = await connection.query('INSERT INTO events SET ?', {
            name,
            date: parsedDate,
        });
        await connection.end();
        return res.json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.put('/', async (req, res) => {
    try {
        const { id, name, date } = req.body;
        const parsedDate = date.substring(0, 19);
        const connection = await mysql.createConnection(DB_CONFIG);
        const [response] = await connection.query(
            `UPDATE events SET name="${name}", date="${parsedDate}" WHERE id="${id}"`,
        );
        await connection.end();
        return res.json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.delete('/', async (req, res) => {
    try {
        const { id } = req.body;
        const connection = await mysql.createConnection(DB_CONFIG);
        const [response] = await connection.query(
            'DELETE FROM events WHERE id=?',
            [id],
        );
        await connection.end();
        return res.json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
});
