import express from 'express';
const router = express.Router();
import { getAllTools, getToolById } from '../controllers/tools.js';
import { Request, Response } from 'express';

interface ToolParams {
  toolId: string;
}

router.get('/all', getAllTools);

router.get('/:toolId', (req: Request<ToolParams>, res: Response) => {
  getToolById(req, res);
});

export default router;
