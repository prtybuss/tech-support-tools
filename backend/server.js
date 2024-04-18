
require("dotenv").config();
const mongoose = require('mongoose');
const app = require('./app');



console.log('mode:', process.env.NODE_ENV);

const start = async () => {
	try {
		await mongoose.connect(require('./config/db.config'));

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

