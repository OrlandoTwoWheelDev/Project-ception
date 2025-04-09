const express = require('express');
const app = express();
const cors = require('cors');
const toolsRoutes = require('./routes/tools.cjs');
const usersRoutes = require('./routes/users.cjs');
const pagesRoutes = require('./routes/pages.cjs');

app.use(express.json());
app.use(cors());

app.use('/', pagesRoutes);
app.use('/api/tools', toolsRoutes);
app.use('/api/users', usersRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
