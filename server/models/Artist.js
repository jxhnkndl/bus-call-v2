const { Schema, model } = require('mongoose');

const artistSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  profilePhoto: {
    type: String,
  },
  label: {
    name: { type: String },
    phone: { type: String },
    email: { type: String },
  },
  manager: {
    name: { type: String },
    phone: { type: String },
    email: { type: String },
  },
  bookingAgent: {
    name: { type: String },
    phone: { type: String },
    email: { type: String },
  },
  tourManager: {
    name: { type: String },
    phone: { type: String },
    email: { type: String },
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

const Artist = model('Artist', artistSchema);

module.exports = Artist;
