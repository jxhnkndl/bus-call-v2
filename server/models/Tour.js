const { Schema, model } = require('mongoose');

const tourSchema = new Schema({
  headliner: {
    type: String,
    required: true,
    trim: true,
  },
  support: [{ type: String }],
  name: { type: String },
  tourManager: {
    name: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
  },
  concerts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Concert',
    },
  ],
  crew: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Tour = model('Tour', tourSchema);

module.exports = Tour;
