const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

router.post('/register', usersController.registerUser)

router.post('/login', usersController.loginUser)

router.get('/profile', authMiddleware, usersController.getProfile)

module.exports = router
