import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import toolsRoutes from './routes/tools.js';
import usersRoutes from './routes/users.js';
import pagesRoutes from './routes/pages.js';
import triviaRoutes from './routes/trivia.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

app.use('/api/pages', pagesRoutes);
app.use('/api/tools', toolsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/trivia', triviaRoutes);

app.use(express.static(path.join(__dirname, 'dist', 'client')));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, 'dist', 'client', 'index.html'));
});

import { Request, Response } from 'express';
app.use((err: Error, req: Request, res: Response) => {
  console.error('Unhandled error:', err.message);
  res.status(500).send('Server error');
});


const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
