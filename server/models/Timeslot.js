const { Schema } = require('mongoose');

const timeslotSchema = new Schema(
  {
    timeslot: {
      type: String,
      required: true,
      trim: true,
    },
    event: {
      type: String,
      required: true,
      trim: true
    }
  }
);

module.exports = timeslotSchema;