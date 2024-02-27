const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrHandler = require('./controllers/error');
const app = express();

app.use(cors());
app.use(express.json({ limit: '15kb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoutes);

// handle undefined Routes
app.use('*', (req, res, next) => {
  const err = new AppError(404, 'fail', 'undefined route', req.url);
  next(err, req, res, next);
});

app.use(globalErrHandler);


module.exports = app;
