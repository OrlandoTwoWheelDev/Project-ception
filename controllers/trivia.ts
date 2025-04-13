import { createTriviaCard as insertTriviaCard } from '../db/demo.game.js';
import { Request, Response, RequestHandler } from 'express';
import { pool } from '../db/index.js';


const createTriviaCard = async (req: Request, res: Response): Promise<void> => {
  const { question, answer, category = 'General', points = 10 } = req.body;

  if (!question || !answer) {
    res.status(400).json({ error: 'Missing question or answer' });
  }

  try {
    const card = await insertTriviaCard(question, answer, category, points);
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create trivia card' });
    console.error('Error creating trivia card:', err);
  }
};


export const getRandomTrivia: RequestHandler = async (req, res) => {
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



export { createTriviaCard };