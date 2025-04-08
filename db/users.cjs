const { pool } = require('./index.cjs');
const bcrypt = require('bcrypt');

const users = [
  { username: 'testUser1', password: 'hashedPassword1', email: 'test1@example.com' },
  { username: 'testUser2', password: 'hashedPassword2', email: 'test2@example.com' },
];

const createUsers = async (username, password, email) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(`
      INSERT INTO users (username, password_hash, email)
      VALUES ($1, $2, $3)
      RETURNING *;
      `, [username, hashedPassword, email]);
    return rows[0];
  } catch (err) {
    console.error('Error Creating User', err);
  }
}

const getAllUsers = async () => {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM users;
      `);
      return rows;
  }catch (err) {
    console.error('Error Getting All Users', err);
  }
};

const getUserById = async (id) => {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM users WHERE id = $1;
      `, [id]);
    return rows[0];
  } catch (err) {
    console.error(`Error getting user with ID ${id}`, err);
  }
};

const getUserByUsername = async (username) => {
  try{
    const { rows } = await pool.query(`
      SELECT * FROM users 
      WHERE username = $1;
      `, [username]);
      return rows[0];
  }catch (err) {
    console.error('Error Getting User By Username', err);
  }
}

const getUserByEmail = async (email) => {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM users
      WHERE email = $1;
      `, [email]);
  }catch (err) {
    console.error('Error Getting User By Email', err);
  }
}

const getUserByUsernameAndPassword = async (username, password) => {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM users
      WHERE username = $1 AND password_hash = $2;
      `, [username, password]);
      return rows[0];
  }catch (err) {
    console.error('Error Getting User By Username And Password', err);
  }
};

const authenticateUser = async (username, password) => {
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

const loginWithToken = async (token) => {
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

module.exports = {
  createUsers, 
  getAllUsers,
  getUserById,
  getUserByUsername,
  getUserByEmail,
  getUserByUsernameAndPassword,
  authenticateUser,
  loginWithToken
};
