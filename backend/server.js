
const mongoose = require('mongoose');
const app = require('./app');

/* const dotenv = require('dotenv');
dotenv.config({
	path: './config.env'
}); 
var corsOptions = {
	origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
};

app.use(cors(corsOptions));*/





const start = async () => {
	console.log('mode:', process.env.NODE_ENV);
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

