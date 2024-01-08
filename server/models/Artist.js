const { Schema, model } = require('mongoose');

const artistSchema = new Schema({
  name: {
    type: String,
    reqired: true,
    trim: true,
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
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

const Artist = model('Artist', artistSchema);

module.exports = Artist;
