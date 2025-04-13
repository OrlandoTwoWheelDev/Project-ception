import { createUsers, getUserByUsername } from '../db/users.queries.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const registerUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  try {
    const userExists = await getUserByUsername(username);

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUsers(username, hashedPassword, email);

    if (!newUser) {
      return res.status(500).json({ message: 'Failed to create user' });
    }

    res.status(200).json({ message: 'User registered', user: newUser.username });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    console.error('Error registering user', error);
  }
};


const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

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
    res.status(500).json({ message: 'Server Error' });
    console.error('Error logging in user', error);
  }
};

export {
  registerUser,
  loginUser,
};
