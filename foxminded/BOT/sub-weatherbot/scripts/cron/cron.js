const cron = require('node-cron');
const moment = require('moment-timezone');
const WeatherDataProvider = require('../bot/weath-data-provider');
const WeathMsgProvider = require('../bot/weath-msg-provider');
const User = require('../mogooseDB/user-schema');
const logger = require('../logger/logger');

class Cron {
  constructor(bot, db_uri, api) {
    this.bot = bot;
    this.api = api;
    this.db_uri = db_uri;
    this.dataProvider = new WeatherDataProvider(this.api);
    this.messageProvider = new WeathMsgProvider();
    this.log = new logger();
  }
  async setSchedule(msg) {
    cron.schedule('* * * * *', async () => {
      try {
        const date = new Date();
        const convTime = moment(date, 'HH:mm').utc().format('HH:mm');
        const subscribers = await User.find({ time: convTime });

        if (subscribers.length === 0) {
          return;
        }

        subscribers.map(async (elem) => {
          const { latitude, longitude } = elem.location;
          const localWeather = await this.dataProvider.getLocalWeather(
            latitude,
            longitude
          );
          const message = this.messageProvider.getLocationMsg(localWeather);

          this.bot.sendMessage(elem.chatId, message, {
            parse_mode: 'HTML',
          });
        });
        this.log.info('User has received weather info');
      } catch (err) {
        this.log.error(err.message);
        return err.message;
      }
    });
  }
}
module.exports = Cron;
