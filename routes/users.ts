import { Router } from 'express';
const router = Router();
import { loginUser, registerUser } from '../controllers/users.js';
import { Request, Response } from 'express';

router.get('/loginRegister', (req: Request, res: Response) => {
  res.status(200).json({ message: 'GET request successful' });
});

router.post('/login', async (req: Request, res: Response) => {
  if (req.body.username && req.body.password) {
    await loginUser(req, res);
  } else {
    res.status(400).json({ message: 'Invalid data' });
  }
});

router.post('/register', async (req: Request, res: Response) => {
  if (req.body.username && req.body.password && req.body.email) {
    await registerUser(req, res);
  } else {
    res.status(400).json({ message: 'Invalid data' });
  }
});

export default router;