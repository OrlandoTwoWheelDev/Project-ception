import express from 'express';
const router = express.Router();
import { getAllTools, getToolById } from '../controllers/tools';
import { Request, Response } from 'express';

interface ToolParams {
  toolId: string;
}

router.get('/', getAllTools);

router.get('/:toolId', (req: Request<ToolParams>, res: Response) => {
  getToolById(req, res);
});

export { router as toolsRoutes };
export { router };