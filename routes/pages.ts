import express from 'express'
const router = express.Router()
import { Response } from 'express';

router.get('/', (res: Response) => {
  res.send('Welcome to the Home Page!')
})

export default router;
