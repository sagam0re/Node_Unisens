const Telegram = require('node-telegram-bot-api');
const { emojiCountryCode } = require('country-code-emoji');
const HolidayProvider = require('./holidayProvider');

const { US, RU, GE, UA, IT, NZ } = require('./flags');

class HolidayBot {
  constructor(token, api, links, url, host, port) {
    this.token = token;
    this.bot = new Telegram(token, {
      webHook: {
        port,
        host,
      },
    });
    this.bot.setWebHook(url + token);
    this.holiday = new HolidayProvider(api, links);
    this.command = {
      start: '/start',
    };
    this.keyboards = {
      main: {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [
            [{ text: US }, { text: RU }, { text: UA }],
            [{ text: IT }, { text: GE }, { text: NZ }],
          ],
        },
      },
    };
  }

  _generateStartMsg(msg) {
    const { chat } = msg;
    this.bot.sendMessage(chat.id, 'Choose any country', this.keyboards.main);
  }

  async _generateHolidayMsg(msg) {
    const { text, chat } = msg;
    const countryCode = emojiCountryCode(text);
    const temp = await this.holiday.getHoliday(countryCode, text);
    this.bot.sendMessage(chat.id, temp);
  }

  _generateDefaultMsg(msg) {
    const { chat } = msg;
    this.bot.sendMessage(chat.id, 'Please, chose one of given countries');
  }

  _getEmojiCountryCode(text) {
    try {
      return emojiCountryCode(text);
    } catch (err) {
      return null;
    }
  }

  _sendMsg(msg) {
    const { text } = msg;
    const countryCode = this._getEmojiCountryCode(text);
    if (countryCode) {
      return this._generateHolidayMsg(msg);
    }
    if (text === this.command.start) {
      return this._generateStartMsg(msg);
    }
    return this._generateDefaultMsg(msg);
  }

  async processMsg(msg) {
    try {
      await this._sendMsg(msg);
    } catch (err) {
      return err.message;
    }
  }
}
module.exports = HolidayBot;
