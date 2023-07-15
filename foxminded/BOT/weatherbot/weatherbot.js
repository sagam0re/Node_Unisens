const Telegram = require('node-telegram-bot-api');
const WeatherDataProvider = require('./weatherdataProvider');
const MessageBot = require('./messageProviderBot');
const Logger = require('./logger');

class WeatherBot {
  constructor(token, api, port, host, url) {
    this.logger = new Logger();

    this.bot = new Telegram(token, {
      webHook: {
        port,
        host,
      },
    });
    this.bot.setWebHook(url + token);
    this.data = new WeatherDataProvider(api);
    this.command = {
      about: '/about',
      start: '/start',
    };
    this.msgBot = new MessageBot(this.command.start, this.command.about);
  }

  _generStartMsg(msg) {
    switch (msg.text) {
      case this.command.start:
        const startText = this.msgBot.getStartMsg();
        this.bot.sendMessage(msg.chat.id, startText, { parse_mode: 'HTML' });
        this.logger.logger.info(msg.text);
        break;
      case this.command.about:
        const aboutText = this.msgBot.getAboutMsg();
        this.bot.sendMessage(msg.chat.id, aboutText, { parse_mode: 'HTML' });
        this.logger.logger.info(msg.text);
        break;
      default:
        const randomText = this.msgBot.getRandomMsg();
        this.bot.sendMessage(msg.chat.id, randomText, { parse_mode: 'HTML' });
        this.logger.logger.info(msg.text);
        break;
    }
  }

  async _generlocalWeatherMsg(msg) {
    const lon = msg.location.longitude;
    const lat = msg.location.latitude;
    const localWeather = await this.data.getLocalWeather(lat, lon);
    const locWeathtext = this.msgBot.getLocationMsg(
      msg.chat.first_name,
      localWeather
    );
    this.bot.sendMessage(msg.chat.id, locWeathtext, {
      parse_mode: 'HTML',
    });
    this.logger.logger.info(`coord: ${lon} ${lat} is received`);
  }

  _sendWeather(msg) {
    switch (msg.text) {
      case undefined:
        this._generlocalWeatherMsg(msg);
        break;
      default:
        this._generStartMsg(msg);
        break;
    }
  }

  processMsg(msg) {
    try {
      this._sendWeather(msg);
    } catch (err) {
      this.bot.sendMessage(msg.chat.id, err.message);
      return err.message;
    }
  }
}

module.exports = WeatherBot;
