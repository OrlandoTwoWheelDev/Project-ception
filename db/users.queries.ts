import { pool } from './index.js';
import bcrypt from 'bcrypt';


interface User {
  id: number;
  username: string;
  password_hash: string;
  email: string;
  token?: string;
  created_at?: Date;
  updated_at?: Date;
};

const createUsers = async (username: string, password: string, email: string): Promise<User | undefined> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(`
      INSERT INTO users (username, password_hash, email)
      VALUES ($1, $2, $3)
      RETURNING *;
      `, [username, hashedPassword, email]);
    return rows[0] as User;
  } catch (err) {
    console.error('Error Creating User', err);
    return undefined;
  }
};

const getAllUsers = async () => {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM users;
      `);
      return rows as User[];
  }catch (err) {
    console.error('Error Getting All Users', err);
  }
};

const getUserById = async (id: number): Promise<User | undefined> => {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM users WHERE id = $1;
      `, [id]);
    return rows[0];
  } catch (err) {
    console.error(`Error getting user with ID ${id}`, err);
  }
};

const getUserByUsername = async (username: string): Promise<User | undefined> => {
  try{
    const { rows } = await pool.query(`
      SELECT * FROM users 
      WHERE username = $1;
      `, [username]);
      return rows[0] as User;
  }catch (err) {
    console.error('Error Getting User By Username', err);
  }
};

const getUserByEmail = async (email: string): Promise<User | undefined> => {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM users
      WHERE email = $1;
      `, [email]);
      return rows[0];
  }catch (err) {
    console.error('Error Getting User By Email', err);
  }
};

const authenticateUser = async (username: string, password: string): Promise<User | undefined> => {
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      throw new Error('User not found');
    }
    
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    
    return user;
  } catch (err) {
    console.error('Error authenticating user', err);
  }
};

const loginWithToken = async (token: string): Promise<User | undefined> => {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM users
      WHERE token = $1;
      `, [token]);
      return rows[0];
  }catch (err) {
    console.error('Error Logging In With Token', err);
  }
};

export {
  createUsers, 
  getAllUsers,
  getUserById,
  getUserByUsername,
  getUserByEmail,
  authenticateUser,
  loginWithToken
};
