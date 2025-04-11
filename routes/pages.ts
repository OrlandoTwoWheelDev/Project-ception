import express from 'express'
const router = express.Router()
import { Request, Response } from 'express';

router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Tools Library API!')
})

export { router as pagesRoutes };
export { router };