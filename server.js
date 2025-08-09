require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const todoListRoutes = require('./routes/todoListRoutes');

const app = express();
const PORT = process.env.PORT;
const DB_URI = process.env.MONGO_URI;


mongoose.connect(DB_URI)
    .then(() => console.log('MongoDB Connected Successfully!'))
    .catch(err => console.error('MongoDB connection error: ', err))

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api/auth', authRoutes);
app.use('/api/todolist', todoListRoutes);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Open index.html in your browser to test the API.');
});
