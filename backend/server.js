
const mongoose = require('mongoose');
const app = require('./app');

const dotenv = require('dotenv');
dotenv.config({
  path: './config.env'
});


const start = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log('db connected');

    app.listen(process.env.PORT, () => {
      console.log("server started on", process.env.PORT, 'port');
    })
  }
  catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();

