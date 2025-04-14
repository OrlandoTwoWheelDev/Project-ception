import express from 'express';
import { getAllTools, getToolById } from '../controllers/tools.js';
import { Request, Response } from 'express';

const router = express.Router();
interface ToolParams {
  toolId: string;
}

router.get('/all', getAllTools);

router.get('/:toolId', (req: Request<ToolParams>, res: Response) => {
  getToolById(req, res);
});

export default router;
