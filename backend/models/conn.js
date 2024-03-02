const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({
    path: './config.env'
});

const conn = mongoose.createConnection(process.env.DB);

module.exports = conn;


