const express = require('express');
const cors = require('cors');
const { pool } = require('./db/index.cjs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/about', (req, res) => {
  res.send('Welcome to About Me Page!');
});

app.get('/info', (req, res) => {
  res.send('Welcome to the HVAC Info Page!');
});

app.get('/demo', (req, res) => {
  res.send('Welcome to The Demo Page!');
});

app.get('/loginRegister', (req, res) => {
  res.send('Welcome to Login or Register Page!');
});

app.get('/api/tools', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tools');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Something broke!' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
