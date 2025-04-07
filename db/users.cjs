const { pool } = require('./index.cjs');

const users = [
  { username: 'testUser1', password: 'hashedPassword1', email: 'test1@example.com' },
  { username: 'testUser2', password: 'hashedPassword2', email: 'test2@example.com' },
];

const createUser = async (username, password, email) => {
  try {
    const { rows } = await pool.query(`
      INSERT INTO users (username, password_hash, email)
      VALUES ($1, $2, $3);
    `, [username, password, email]);
    
    console.log(`User ${username} created successfully`);
    return rows[0];
  } catch (err) {
    console.error(`Error creating user ${username}`, err);
  }
};

const createUsers = async () => {
  try {
    const { rows } = await Promise.all(
      users.map(users => createUser(users.username, users.password, users.email))
    );
    
    console.log('All users created successfully');
    return rows;
  } catch (err) {
    console.error('Error creating users', err);
  }
};

module.exports = { createUser, createUsers };
