import { pool } from './index.js';

export interface Tool {
  id: number;
  tool_name: string;
  tool_description: string;
  tool_link: string;
}

const createTool = async (toolName: string, toolDescription: string, toolLink: string): Promise<Tool | undefined> => {
  try {
    const { rows } = await pool.query(`
      INSERT INTO tools (tool_name, tool_description, tool_link)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [toolName, toolDescription, toolLink]);
    
    console.log(`Tool: ${toolName} created successfully`);
    return rows[0] as Tool;
  } catch (err) {
    console.error(`Error creating tool ${toolName}`, err);
  }
};

export { createTool };