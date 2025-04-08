const getAllTools = async (req, res) => {
  try {
    const tools = await Tool.find()
    res.status(200).json(tools)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

const getToolById = async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.toolId)
    if (!tool) return res.status(404).json({ message: 'Tool not found' })
    res.status(200).json(tool)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

module.exports = {
  getAllTools,
  getToolById
}
