const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
	text: {
		type: String,
		required: [true, "no TXT in message was provided"],
	},
	author: {
		type: Schema.Types.ObjectId, ref: 'User'
	},
	created: {
		type: Date,
		default: Date.now
	},
	edited: {
		type: Date,
		default: Date.now
	}
});
commentSchema.method("toJSON", function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});
module.exports = commentSchema;