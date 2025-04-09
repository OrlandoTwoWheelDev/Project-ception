const { pool } = require('../db/index.cjs');

const getAllTools = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tools');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getToolById = async (req, res) => {
  try {
    const { toolId } = req.params;
    const result = await pool.query('SELECT * FROM tools WHERE id = $1', [toolId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tool not found' });
    }
    
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllTools,
  getToolById,
};
