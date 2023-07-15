const mongoose = require('mongoose');

async function connectingDB(url) {
  await mongoose.connect(url);
}

module.exports = connectingDB;
