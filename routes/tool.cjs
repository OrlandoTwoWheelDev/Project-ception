const express = require('express')
const router = express.Router()
const toolsController = require('../controllers/tools')

router.get('/', toolsController.getAllTools)

router.get('/:toolId', toolsController.getToolById)

router.post('/', toolsController.createTool)

router.put('/:toolId', toolsController.updateTool)

router.delete('/:toolId', toolsController.deleteTool)

module.exports = router
