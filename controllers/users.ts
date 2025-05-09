import { getUserByUsername } from '../db/users.queries.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { pool } from '../db/index.js';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3) RETURNING id';
    const values = [username, hashedPassword, email];
    const result = await pool.query(query, values);

    const newUserId = result.rows[0].id;
    res.status(201).json({ message: 'User registered', userId: newUserId });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};



export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
