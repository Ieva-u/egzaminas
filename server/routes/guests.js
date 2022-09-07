import express from 'express';
import mysql from 'mysql2/promise';
import { DB_CONFIG } from '../config/dbConfig.js';

export const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const params = req.params;
        const connection = await mysql.createConnection(DB_CONFIG);
        const [rows] = await connection.query(
            `SELECT guests.* FROM guests INNER JOIN events ON events.id = guests.event_id WHERE guests.event_id = "${params.id}"`,
        );
        res.send(rows);
        await connection.end();
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const { eventId, name, email, date } = req.body;
        const parsedDate = date.substring(0, 19);
        const connection = await mysql.createConnection(DB_CONFIG);
        const [response] = await connection.query('INSERT INTO guests SET ?', {
            event_id: eventId,
            name,
            email,
            date: parsedDate,
        });
        await connection.end();
        return res.json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

router.put('/', async (req, res) => {
    try {
        const { id, name, email, date } = req.body;
        const parsedDate = date.substring(0, 19);
        const connection = await mysql.createConnection(DB_CONFIG);
        const [response] = await connection.query(
            'UPDATE guests SET ? WHERE id=?',
            [{ name, email, date: parsedDate }, id],
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
            `DELETE FROM guests WHERE id="${id}"`,
        );
        await connection.end();
        return res.json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
});
