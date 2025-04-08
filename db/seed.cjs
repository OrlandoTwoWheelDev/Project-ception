const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: false,
});

const { createUser, createUsers } = require('./users.cjs');
const { createTool } = require('./tool.cjs');

const dropTables = async() => {
  try{
    await pool.query(`
      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS tools CASCADE;
      `)
  }catch(err){
    console.error('Error dropping tables', err);
  }
};

const createTables = async() => {
  try{
    await pool.query(`
      CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50),
      password_hash TEXT,
      email VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE tools (
      id SERIAL PRIMARY KEY,
      tool_name VARCHAR(50),
      tool_description TEXT,
      tool_link TEXT)
      `)
  }catch(err){
    console.error('Error creating tables', err);
  }
};

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to DB');
    client.release();
  }catch(err) {
    console.error('Error connecting to DB', err);
  }
}
connectDB();

const alignAnPrime = async () => {
  await pool.connect();
  console.log('Connected to DB');

  await dropTables();
  console.log('Dropped Tables');

  await createTables();
  console.log('Created Tables');

  await createUser('testUser1', 'hashedPassword1', 'test1@example.com');
  
  console.log('User Created');


  await createUsers();
  console.log('Created Users');

  await createTool('Refrigerant Temp and Pressure Guages', 'Tool used to measure refrigerant temperature and pressures',
     'https://www.fieldpiece.com/product/jl3kh6-job-link-probes-charging-and-air-kit/');
  await createTool('Digital Manometer', 'Tool used to measure airflow static pressure',
     'https://www.fieldpiece.com/product/jl3km2-job-link-system-dual-port-manometer-probe-kit/');
  await createTool('Digital Multimeter', 'Tool used to measure voltage, current, and resistance',
     'https://www.fieldpiece.com/product/jl3km1-job-link-system-multimeter-probe-kit/');
  console.log('Created Tools');

};
alignAnPrime();