import express from 'express';
import { getRandomTrivia, createTriviaCard } from '../controllers/trivia.js';

const router = express.Router();

router.get('/trivia/random', getRandomTrivia);

router.post('/trivia', createTriviaCard);

export default router;
