require('dotenv').config();
const express = require('express');
const connectingDB = require('./src/mongooseDB/connection');
const Logger = require('./src/logger/logger');

const log = new Logger();
const { DB_URL, PORT } = process.env;

const app = express();

const router = require('./src/routes/router');

app.use(express.json());
app.use('/', router);

app.listen(PORT || 3000, () => {
  log.info(`SERVER IS LISTENING ON PORT: ${PORT}`);
});

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
