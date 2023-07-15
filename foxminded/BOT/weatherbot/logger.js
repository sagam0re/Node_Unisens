const pino = require('pino');
const pretty = require('pino-pretty');
require('dotenv').config();

const { PRETTY_LOGGING } = process.env;

class Logger {
  constructor() {
    const config = pretty({
      prettyPrint: PRETTY_LOGGING,
      translateTime: true,
    });
    this.logger = pino(config);
  }
}

module.exports = Logger;
