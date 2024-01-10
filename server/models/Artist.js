const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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

// Hash password for new accounts and accounts updating password field
artistSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Check credentials when user logs in
artistSchema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Artist = model('Artist', artistSchema);

module.exports = Artist;
