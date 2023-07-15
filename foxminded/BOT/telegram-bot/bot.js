const Bot = require('./process');
require('dotenv').config();

const { TOKEN } = process.env;
const newBot = new Bot(TOKEN);
newBot.bot.on('message', (msg) => {
  newBot.processMsg(msg);
});
