import { pool } from './index.js';

interface TriviaCard {
  id: number;
  question: string;
  answer: string;
  category: string;
  points: number;
};

const createTriviaCard = async( question: string, answer: string, category: string, points: number): Promise<TriviaCard | undefined> => { 
  try { 
    const { rows } = await pool.query(`
      INSERT INTO trivia (question, answer, category, points)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [question, answer, category, points]);
    return rows[0] as TriviaCard;
  } catch (err) { 
    if ((err as { code?: string }).code === '23505') {
      console.error('Trivia card already exists', err);
    } else {
      console.error('Error Creating Trivia Card', err);
    }
    return undefined;
  }
};


const getAllTriviaCards = async (): Promise<TriviaCard[] | undefined> => {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM trivia;
    `);
    return rows as TriviaCard[];
  }
  catch (err) {
    console.error('Error Getting All Trivia Cards', err);
    return undefined;
  }
};

// const deleteTriviaCard = async (id: number): Promise<void> => {
//   try {
//     await pool.query(`
//       DELETE FROM trivia WHERE id = $1;
//     `, [id]);
//   } catch (err) {
//     console.error(`Error Deleting Trivia Card with ID ${id}`, err);
//   }
// }


export { createTriviaCard, getAllTriviaCards };
