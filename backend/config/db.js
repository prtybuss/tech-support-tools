const {
	DB_USER,
	DB_PASSWORD,
	DB_HOST,
	DB_PORT,
	DB_NAME,
	NODE_ENV
} = process.env;

exports.url = (process.env.NODE_ENV || "development") ? "mongodb://localhost:27017" : `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`

