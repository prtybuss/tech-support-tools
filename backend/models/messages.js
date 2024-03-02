const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  text: {
    type: String,
    required: [true, "no TXT in message was provided"],
  },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  ticket: { type: Schema.Types.ObjectId, ref: 'Ticket' },
  created: {
    type: Date,
    default: Date.now
  },
  edited: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'new',
    enum: ['new', 'viewed']
  }
});

messageSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = messageSchema;
