import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/users.js';
import triviaRoutes from './routes/trivia.js';
import homeRoutes from './routes/pages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/home', homeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trivia', triviaRoutes);

app.use(express.static(path.join(__dirname, 'client')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'index.html'));
// });

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
