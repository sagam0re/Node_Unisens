const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  chatId: Number,
  time: String,
  location: Object,
});

module.exports = mongoose.model('Subscribers', userSchema);
