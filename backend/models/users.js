var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const userSchema = new Schema({
	login: {
		type: String,
		unique: [true, "login already exists in database!"],
		lowercase: true,
		trim: true,
		required: [true, "login not provided"],
	},
	role: {
		type: String,
		enum: ["user", "admin", "moderator"],
		default: "user",
	},
	password: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	office: { type: Schema.Types.ObjectId, ref: 'Office' },
	hardware: {
		info: String,
		edited: {
			type: Date,
			default: Date.now
		}
	},
	soundDir: String,
});

module.exports = userSchema;
