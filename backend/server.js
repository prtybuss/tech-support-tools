
const dotenv = require('dotenv');
dotenv.config({
	path: './config.env'
});
const mongoose = require('mongoose');
const app = require('./app');
const url = require('./config/db.config.js')


/* console.log('mode:', process.env.NODE_ENV); */

const start = async () => {
	try {
		await mongoose.connect(url?.url);

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

