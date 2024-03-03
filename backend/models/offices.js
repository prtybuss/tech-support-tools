const mongoose = require('mongoose');
const { Schema } = mongoose;
const dotenv = require('dotenv');
dotenv.config({
    path: './config.env'
});

const imgSchema = new Schema({
	name: String,
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	created: {
		type: Date,
		default: Date.now
	}
}, {
	virtuals: {
		path: {
			get() {
				const parent = this.parent();
				return '../public/uploads/' + parent.numb + '/'
			}
		}
	}
}
);

const officeSchema = new Schema({
	numb: String,
	ip: String,
	subnet: String,
	adress: String,
	adressFull: String,
	tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
	comments: [
		{
			text: String,
			author: { type: Schema.Types.ObjectId, ref: 'User' },
			created: {
				type: Date,
				default: Date.now
			},
		}],
	links: [{
		title: String,
		url: String
	}],
	hardware: {
		info: String,
		edited: {
			type: Date,
			default: Date.now
		}
	},
	users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	imgs: [imgSchema]
},
	{
		virtuals: {
			fileServerIp: {
				get() {
					return '\\\\' + this.ip.replace('*', process.env.FSHOSTADRESS) + '\\'
				}
			}
		}
	});

officeSchema.method("toJSON", function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = officeSchema;
