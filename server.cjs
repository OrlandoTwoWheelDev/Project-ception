const express = require('express')
const app = express()
const toolsRoutes = require('./routes/tools')
const usersRoutes = require('./routes/users')
const pagesRoutes = require('./routes/pages')

app.use(express.json())

app.use('/', pagesRoutes)
app.use('/api/tools', toolsRoutes)
app.use('/api/users', usersRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
