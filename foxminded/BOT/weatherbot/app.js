const WeatherBot = require('./weatherbot');
require('dotenv').config();

const { TOKEN, API, PORT, HOST, URL } = process.env;
const newBot = new WeatherBot(TOKEN, API, PORT, HOST, URL);

newBot.bot.on('message', (msg) => {
  newBot.processMsg(msg);
});
