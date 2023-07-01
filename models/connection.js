require('dotenv').config();
const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL;

// Establish a connection to mongodb
mongoose.connect(DATABASE_URL);

// logs for connections (on open, on close, on error)
mongoose.connection
    .on('open', () => console.log('Connected to Mongoose'))
    .on('close', () => console.log('Disconnected from Mongoose'))
    .on('error', () => console.log('Connection Error'));

module.exports = mongoose;