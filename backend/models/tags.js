const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    unique: [true, "tag already exists!"],
    lowercase: true,
    trim: true,
  },
  offices: [{ type: Schema.Types.ObjectId, ref: 'Office' }],
})

tagSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = tagSchema;