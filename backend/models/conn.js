const mongoose = require('mongoose');
const url = require('../config/db.config.js')


const conn = mongoose.createConnection(url);

module.exports = conn;


