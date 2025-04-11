import express from 'express';
const router = express.Router();
import { loginUser, registerUser } from '../controllers/users';
import { Request, Response } from 'express';


router.get('/loginRegister', (req: Request, res: Response) => {
  res.status(200).json({ message: 'GET request successful' });
});


router.post('/loginRegister', async (req: Request, res: Response) => {
  if (req.body.username && req.body.password && req.body.email) {
    await registerUser(req, res);
  } else if (req.body.username && req.body.password) {
    await loginUser(req, res);
  } else {
    res.status(400).json({ message: 'Invalid data' });
  }
});

export { router as usersRoutes };
export { router };