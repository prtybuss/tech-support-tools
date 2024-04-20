
const mongoose = require('mongoose');
const app = require('./app');
const db = require('./config/db')


const start = async () => {
	try {
		await mongoose.connect(db.url).then(() => console.log('DONE,\n  mongo conn', db.url))
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

