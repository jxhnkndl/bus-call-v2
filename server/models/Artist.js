const { Schema, model } = require('mongoose');

const artistSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  password: {
    type: String,
    required: true,
    min: [8, 'Password must be at least 8 characters long'],
    max: [32, 'Password must not exceed 32 characters'],
  },
  name: {
    type: String,
    reqired: true,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  profilePhoto: {
    type: String
  },
  label: {
    name: { type: String },
    phone: { type: String },
    email: { type: String }
  },
  manager: {
    name: { type: String },
    phone: { type: String },
    email: { type: String }
  },
  bookingAgent: {
    name: { type: String },
    phone: { type: String },
    email: { type: String }
  },
  tourManager: {
    name: { type: String },
    phone: { type: String },
    email: { type: String }
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
