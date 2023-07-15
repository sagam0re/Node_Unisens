const HolidayBot = require('./holidayBot');
require('dotenv').config();
const links = require('./links');

const { PORT, HOST, TOKEN, URL, API } = process.env;

const newBot = new HolidayBot(TOKEN, API, links, URL, HOST, PORT);

newBot.bot.on('message', (msg) => {
  newBot.processMsg(msg);
});
