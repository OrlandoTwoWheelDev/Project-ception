import { Request, Response, RequestHandler } from 'express';
import { pool } from '../db/index.js';

export const getRandomTrivia: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM trivia ORDER BY RANDOM() LIMIT 1');
    const triviaCard = result.rows[0];
    if (!triviaCard) {
      res.status(404).json({ message: 'No trivia found' });
      return;
    }
    res.status(200).json(triviaCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
