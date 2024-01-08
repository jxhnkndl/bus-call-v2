const { Schema, model } = require('mongoose');
const timeslotSchema = require('./Timeslot');

const concertSchema = new Schema(
  {
    date: {
      type: Date,
      required: true
    },
    closed: {
      type: Boolean,
      default: false
    },
    venue: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      trim: true,
    },
    zip: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      trim: true
    },
    capacity: {
      type: Number,
    },
    promoter: {
      type: String,
      trim: true
    },
    promoterEmail: {
      type: String,
      trim: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    doors: {
      type: String,
      trim: true
    },
    headliner: {
      type: String,
      required: true,
      trim: true
    },
    support: {
      type: String,
      trim: true,
    },
    parking: {
      type: Boolean
    },
    soundcheck: {
      type: Boolean
    },
    lounge: {
      type: Boolean
    },
    catering: {
      type: Boolean
    },
    wifi: {
      type: Boolean
    },
    showers: {
      type: Boolean
    },
    rider: {
      type: Boolean
    },
    hotel: {
      type: Boolean
    },
    daysheet: [timeslotSchema]
  }
);

const Concert = model('Concert', concertSchema);

module.exports = Concert;