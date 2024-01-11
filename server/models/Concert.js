const { Schema, model } = require('mongoose');

const timeslotSchema = new Schema({
  timeslot: {
    type: String,
    required: true,
    trim: true,
  },
  event: {
    type: String,
    required: true,
    trim: true,
  },
});

const concertSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  closed: {
    type: Boolean,
    default: false,
  },
  venue: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  zip: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  capacity: {
    type: Number,
  },
  promoter: {
    name: { 
      type: String, 
      trim: true 
    },
    phone: { 
      type: String, 
      trim: true 
    },
    email: {
      type: String,
      trim: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
  },
  doors: {
    type: String,
    required: true,
    trim: true,
  },
  parking: {
    type: Boolean,
  },
  soundcheck: {
    type: Boolean,
  },
  lounge: {
    type: Boolean,
  },
  catering: {
    type: Boolean,
  },
  wifi: {
    type: Boolean,
  },
  showers: {
    type: Boolean,
  },
  rider: {
    type: Boolean,
  },
  hotel: {
    type: Boolean,
  },
  daysheet: [timeslotSchema],
});

const Concert = model('Concert', concertSchema);

module.exports = Concert;
