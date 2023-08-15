const express = require('express');
require('dotenv').config();
const db = require('./src/db/connection');

const PORT = process.env.PORT
const app = express()
app.use(express.json())

db();

// import all routes
const clientRoutes = require('./src/routes/client');
const depositRoutes = require('./src/routes/deposit');
const retraitRoutes = require('./src/routes/retrait');

app.use('/api/clients',clientRoutes);
app.use('/api/deposits',depositRoutes);
app.use('/api/retraits', retraitRoutes);

app.listen(PORT, () => console.log(`server running on port ${PORT}`))