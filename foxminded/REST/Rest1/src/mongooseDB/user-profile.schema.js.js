const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  nickName: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
});

module.exports = mongoose.model('userProfiles', profileSchema);
