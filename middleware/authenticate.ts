import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../src/utils/env.js';
import User from '../db/users.queries.js'


const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ error: 'Access Denied' });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    (req as Request & { User?: User }).User = verified as User;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid Token' });
    console.error('Error authenticating user', err);
  }
};

export { authenticateUser };
