
const mongoose = require('mongoose');
const app = require('./app');
const {	DB_INSERTDATASAMPLES} = process.env;
const adminController = require('./controllers/admin');
const db = require('./config/db')


const start = async () => {
	try {
		await mongoose.connect(db.url, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false
		}).then(() => {
			DB_INSERTDATASAMPLES ?? adminController.insertdatasamples();

		})
		app.listen(process.env.NODE_DOCKER_PORT, () => {
			console.log("server started on", process.env.NODE_DOCKER_PORT, 'port');
		})
	}
	catch (error) {
		console.error(error);
		process.exit(1);
	}
};

start();

