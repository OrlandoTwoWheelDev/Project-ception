const express = require('express')
const router = express.Router()
const toolsController = require('../controllers/tools.cjs')

router.get('/', toolsController.getAllTools)

router.get('/:toolId', toolsController.getToolById)

module.exports = router
