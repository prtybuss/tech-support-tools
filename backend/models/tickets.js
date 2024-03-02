const mongoose = require('mongoose');
const { Schema } = mongoose;


const ticketSchema = new Schema({
  theme: {
    type: String,
    required: [true, "theme of Ticket is't provided"],
  },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  author: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  authorName: String,
  created: {
    type: Date,
    default: Date.now
  },
  office: { type: Schema.Types.ObjectId, ref: 'Office' },
  updated: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'new',
    enum: ['new', 'proceed', 'closed']
  },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
});

ticketSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = ticketSchema;
