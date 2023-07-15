const WeatherBot = require('./scripts/bot/weatherbot');
const connectDB = require('./scripts/mogooseDB/connectionDB');
require('dotenv').config();

const { TOKEN, API, DB_URI, PORT, HOST, URL } = process.env;

const newBot = new WeatherBot(TOKEN, API, DB_URI, PORT, HOST, URL);

newBot.bot.on('message', async (msg) => {
  await connectDB(DB_URI);
  newBot.processMsg(msg);
});
