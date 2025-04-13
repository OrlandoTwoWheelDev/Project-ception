import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

import { createUsers } from './users.queries.js';
import { createTool } from './tool.js';
import { createTriviaCard } from './demo.game.js';

const dropTables = async() => {
  try{
    await pool.query(`
      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS tools CASCADE;
      DROP TABLE IF EXISTS trivia CASCADE;
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
      tool_link TEXT
      );

      CREATE TABLE trivia (
      id SERIAL PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      category TEXT,
      points INT NOT NULL
      );

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

const users = [
  { username: 'user1', password: 'password1', email: 'user1@example.com' },
  { username: 'user2', password: 'password2', email: 'user2@example.com' },
];

const alignAnPrime = async () => {
  await pool.connect();
  console.log('Connected to DB');

  await dropTables();
  console.log('Dropped Tables');

  await createTables();
  console.log('Created Tables');

  await Promise.all(users.map(user => createUsers(user.username, user.password, user.email)));
  console.log('All users created');

  await createTool('Refrigerant Temp and Pressure Guages', 'Tool used to measure refrigerant temperature and pressures',
     'https://www.fieldpiece.com/product/jl3kh6-job-link-probes-charging-and-air-kit/');
  await createTool('Digital Manometer', 'Tool used to measure airflow static pressure',
     'https://www.fieldpiece.com/product/jl3km2-job-link-system-dual-port-manometer-probe-kit/');
  await createTool('Digital Multimeter', 'Tool used to measure voltage, current, and resistance',
     'https://www.fieldpiece.com/product/jl3km1-job-link-system-multimeter-probe-kit/');
  console.log('Created Tools');

  await createTriviaCard('What is important to a HVAC system every month?', 'Air filters', 'Maintenance', 10);
  await createTriviaCard('What is the most common refrigerant used in HVAC systems?', 'R-410A', 'Refrigerants', 20);
  await createTriviaCard('How many times a year should you have maintenance done on your HVAC system?', 'Twice a year', 'Maintenance', 30);
  await createTriviaCard('What is the most common type of HVAC system?', 'Split system', 'Types of systems', 40);
  await createTriviaCard('True or False: HVAC systems only heat and cool air.', 'False', 'General knowledge', 50);
  await createTriviaCard('What is the purpose of a capacitor in an HVAC system?', 'To help the compress or and fan operate efficiently', 'Electrical', 60);
  await createTriviaCard('What should you put in the drain line to mitigate clogs?', 'Hot water', 'Maintenance', 70);
  await createTriviaCard('How many volts are most HVAC systems?', '24 volts and 240 volts', 'Electrical', 80);
  await createTriviaCard('True or False: UV lights sterilize the air in your HVAC system.', 'True', 'General knowledge', 90);
  await createTriviaCard('True or False: HVAC systems never need to be replaced.', 'False', 'General knowledge', 100);
  console.log('Created Trivia Cards');
};

alignAnPrime();