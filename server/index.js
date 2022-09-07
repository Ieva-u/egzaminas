import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import { router as authRouter } from './routes/auth.js';
import { router as eventsRouter } from './routes/events.js';
import { router as guestsRouter } from './routes/guests.js';

const PORT = process.env.APP_PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/users', authRouter);
app.use('/api/v1/events', eventsRouter);
app.use('/api/v1/guests', guestsRouter);
app.all('*', (_, res) => {
    res.status(404).send('Not Found');
});

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
