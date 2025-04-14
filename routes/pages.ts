import express from 'express'
const router = express.Router()
import { Request, Response } from 'express';

router.get('/home', (req: Request, res: Response) => {
  res.send('Welcome to the Home Page!')
})

export default router;
