const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/users.cjs');

router.get('/loginRegister', (req, res) => {
  res.status(200).json({ message: 'GET request successful' });
});


router.post('/loginRegister', async (req, res) => {
  if (req.body.username && req.body.password && req.body.email) {
    await registerUser(req, res);
  } else if (req.body.username && req.body.password) {
    await loginUser(req, res);
  } else {
    res.status(400).json({ message: 'Invalid data' });
  }
});

module.exports = router;
