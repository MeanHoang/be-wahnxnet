const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const cors = require('./config/cors'); // Nhập cấu hình CORS

dotenv.config();

const app = express();
app.use(bodyParser.json());
//config cors
app.use(cors);

//define all routes
app.use('/api/users', userRoutes);

//404
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found 404' });
});

//normal error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
