require('dotenv').config();
const express = require('express');
const { connectingDB } = require('./src/model/connection');
const { router } = require('./src/router/router');
const Logger = require('./src/logger/logger');

const log = new Logger();

const { PORT, DB_URL } = process.env;
const app = express();

app.use(express.json());

router(app);

app.listen(PORT, log.info(`LISTENING ON PORT: ${PORT}`));

(async function connecting() {
  let connect = false;
  do {
    try {
      await connectingDB(DB_URL);
      log.info('CONNECTED');
      connect = true;
    } catch (err) {
      log.error('DB CONNECTION FAILED');
      process.exit(1);
    }
  } while (!connect);
})();
