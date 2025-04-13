import 'dotenv/config';
import express from 'express';
const app = express();
import cors from 'cors';
import { router as toolsRoutes} from './routes/tools.js';
import { router as usersRoutes} from './routes/users.js';
import { router as pagesRoutes} from './routes/pages.js';
import triviaRoutes from './routes/trivia.js';

app.use(express.json());
app.use(cors()); 
 
app.use('/', pagesRoutes);
app.use('/api/tools', toolsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api', triviaRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;