const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  accountType: {
    type: String,
    enum: ['user', 'admin'],
    required: true,
    default: 'user'
  },
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
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  profilePhoto: {
    type: String
  },
  roles: [{ type: String }],
  artists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Artist',
    },
  ],
});

// Hash password for new accounts and accounts updating password field
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Check credentials when user logs in
userSchema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
