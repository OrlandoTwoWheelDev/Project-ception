import { pool } from '../db/index';
import { Tool } from '../db/tool';
import { Request, Response} from 'express';

interface ToolParams {
  toolId: string;
}

const getAllTools = async (req: Request, res: Response) => {
  try {
    const result = await pool.query<Tool>('SELECT * FROM tools');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getToolById = async (req: Request<ToolParams>, res: Response) => {
  try {
    const { toolId } = req.params;
    const result = await pool.query<Tool>('SELECT * FROM tools WHERE id = $1', [toolId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tool not found' });
    }
    
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export {
  getAllTools,
  getToolById,
};
