const { pool } = require('./index.cjs');

const createTool = async (toolName, toolDescription, toolLink) => {
  try {
    const { rows } = await pool.query(`
      INSERT INTO tools (tool_name, tool_description, tool_link)
      VALUES ($1, $2, $3);
    `, [toolName, toolDescription, toolLink]);
    
    console.log(`Tool: ${toolName} created successfully`);
    return rows[0];
  } catch (err) {
    console.error(`Error creating tool ${toolName}`, err);
  }
};

module.exports = {
  createTool
};