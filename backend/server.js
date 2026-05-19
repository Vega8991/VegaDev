import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import contactRouter from './routes/contact.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  methods: ['POST'],
}));

app.use(express.json());

app.use('/api/contact', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { ok: false, error: 'Too many requests, try again later' },
}));

app.use('/api/contact', contactRouter);

app.get('/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
