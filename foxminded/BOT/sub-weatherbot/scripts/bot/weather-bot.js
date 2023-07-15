const Telegram = require('node-telegram-bot-api');
const WeatherDataProvider = require('./weath-data-provider');
const UserService = require('../user-service/user-service');
const WeathMsgProvider = require('./weath-msg-provider');
const Cron = require('../cron/cron');

class WeatherBot {
  constructor(token, api, db_uri, port, host, url) {
    this.regEx = /^(2[0-3]|[0-1]?[\d]):[0-5][\d]$/;
    this.UserService = new UserService(db_uri);
    this.bot = new Telegram(token, {
      webHook: {
        port: port,
        host: host,
      },
    });
    this.bot.setWebHook(url + token);
    this.cron = new Cron(this.bot, db_uri, api);
    this.dataProvider = new WeatherDataProvider(api);
    this.messageProvider = new WeathMsgProvider();
    this.commands = {
      start: '/start',
      about: '/about',
      sub: '/subscribe',
    };
    this.parse_mode = {
      parse_mode: 'HTML',
    };
  }

  _generateMsg(msg) {
    const { start, about, sub } = this.commands;
    switch (msg.text) {
      case start:
        const startMsg = this.messageProvider.getStartMsg();
        this.bot.sendMessage(msg.chat.id, startMsg, this.parse_mode);
        break;
      case about:
        const aboutMsg = this.messageProvider.getAboutMsg(sub);
        this.bot.sendMessage(msg.chat.id, aboutMsg, this.parse_mode);
        break;
      case sub:
        const subMsg = this.messageProvider.getSubMsg();
        this.bot.sendMessage(msg.chat.id, subMsg, this.parse_mode);
        break;
      default:
        const invalidMsg = this.messageProvider.getInvalidMsg(
          start,
          about,
          sub
        );
        this.bot.sendMessage(msg.chat.id, invalidMsg, this.parse_mode);
        break;
    }
  }

  async _sendWeather(msg) {
    const { text } = msg;
    if (text === undefined) {
      await this.UserService.registUser(msg);
    } else if (typeof text === 'string' && this.regEx.test(text)) {
      await this.UserService.updateUser(msg);
      await this.cron.setSchedule(msg);
    } else {
      this._generateMsg(msg);
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
