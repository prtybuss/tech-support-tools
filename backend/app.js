
const express = require('express');
const cors = require('cors');

const auth_controller = require('./controllers/auth');
const user_controller = require('./controllers/user');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const AppError = require('./utils/appError');
const globalErrHandler = require('./controllers/error');
const app = express();

app.use(cors());
app.use(express.json({ limit: '15kb' }));
app.use(express.urlencoded({ extended: true }));


app.post('/signin', auth_controller.signin);
app.post('/signup', auth_controller.signup);
app.get('/home', user_controller.go_home);

// Protect all routes after this 
app.use(auth_controller.protect);
app.use('/api', adminRoutes);
app.use('/', userRoutes);

// handle undefined Routes
app.use('*', (req, res, next) => {
  const err = new AppError(404, 'fail', 'undefined route', req.url);
  next(err, req, res, next);
});
app.use(globalErrHandler);


module.exports = app;

