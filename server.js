const express = require('express');
let cors = require('cors')
require('dotenv').config();
const db = require('./src/db/connection');

const PORT = process.env.PORT
const app = express()
app.use(express.json())
app.use(cors({
    origin:'*'
}))

db();   

// import all routes
const clientRoutes = require('./src/routes/client');
const depositRoutes = require('./src/routes/deposit');
const retraitRoutes = require('./src/routes/retrait');
const acountRoutes = require('./src/routes/acount')

app.use('/api/clients',clientRoutes);
app.use('/api/deposits',depositRoutes);
app.use('/api/retraits', retraitRoutes);
app.use('/api/acounts/', acountRoutes)

app.listen(PORT, () => console.log(`server running on port ${PORT}`))