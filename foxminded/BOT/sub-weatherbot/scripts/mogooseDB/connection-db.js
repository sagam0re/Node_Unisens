const mongoose = require('mongoose');
const Logger = require('../logger/logger');
let log = new Logger();

async function connectingToDB(db_uri) {
  try {
    await mongoose.connect(db_uri);
    log.info('successful DB connection');
  } catch (err) {
    log.error('Failed DB connection');
    return err.message;
  }
}

module.exports = connectingToDB;
