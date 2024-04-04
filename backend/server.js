
const mongoose = require('mongoose');
const app = require('./app');
const {
	DB_USER,
	DB_PASSWORD,
	DB_HOST,
	DB_PORT,
	DB_NAME,
} = process.env;
/* const dotenv = require('dotenv');
dotenv.config({
	path: './config.env'
}); */
var corsOptions = {
	origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
};

app.use(cors(corsOptions));





const start = async () => {
	console.log('mode:', process.env.NODE_ENV);
	try {
		await mongoose.connect(/* process.env.DB */`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`);
		console.log('db connected');
		//const PORT = process.env.NODE_DOCKER_PORT || 8080;
		app.listen(/* process.env.PORT */(process.env.NODE_DOCKER_PORT || 8080), () => {
			console.log("server started on", process.env.PORT, 'port');
		})
	}
	catch (error) {
		console.error(error);
		process.exit(1);
	}
};

start();

