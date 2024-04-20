const mongoose = require('mongoose');
const db = require('../config/db.js')


const conn = mongoose.createConnection(db.url);

module.exports = conn;


