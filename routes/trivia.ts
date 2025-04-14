import express from 'express';
import { getRandomTrivia } from '../controllers/trivia.js';

const router = express.Router();

router.get('/random', getRandomTrivia);

// router.post('/create', createTriviaCard);

export default router;
