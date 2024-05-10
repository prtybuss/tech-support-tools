const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrHandler = require('./controllers/error');
const app = express();
/* const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
}; */
app.use(cors(/* corsOptions */));
app.use(helmet());
app.use(express.json({ limit: '15kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('short'));

app.use('/', userRoutes);

// handle undefined Routes
app.use('*', (req, res, next) => {
	const err = new AppError(404, 'fail', 'undefined route', req.url);
	next(err, req, res, next);
});

app.use(globalErrHandler);


module.exports = app;
