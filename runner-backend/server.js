const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const authRoutes = require('./routes/authRoutes');
const runRoutes = require('./routes/runRoutes');

// Parse Json payloads and enable cross origin requests
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/auth', authRoutes);
app.use('/api/runs', runRoutes);


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Database connection failed: ', err));

const PORT = process.env.PORT || 5005;
const HOST = '10.0.0.232';

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});