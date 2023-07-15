const Telegram = require('node-telegram-bot-api');
const Logger = require('./logger');

const { aboutBot, linkedin, gitLab } = require('./links');

class Bot {
  constructor(token) {
    this.token = token;
    this.logger = new Logger();
    this.bot = new Telegram(token, { polling: true });
    this.commands = {
      links: '/links',
      about: '/about',
      start: '/start',
      help: '/help',
    };
  }

  _generateLinkMsg(msg) {
    const { chat, text } = msg;

    this.bot.sendMessage(chat.id, `linkedin: ${linkedin}\nGitLab: ${gitLab}`);
    this.logger.logger.info(text);
  }
  _generateAboutMsg(msg) {
    const { chat, text } = msg;
    this.logger.logger.info(text);
    this.bot.sendMessage(chat.id, `${aboutBot}`);
  }
  _generateCommandMsg(msg, comm1, comm2) {
    const { chat, text } = msg;
    this.logger.logger.info(text);
    this.bot.sendMessage(
      chat.id,
      `Here are list of commands \n${comm1}\n${comm2}`
    );
  }
  _generateDefaultMsg(msg, command) {
    const { chat, text } = msg;
    this.logger.logger.info(text);
    this.bot.sendMessage(chat.id, `Here are valid commands ${command}`);
  }

  _sendMessages(msg) {
    const { links, about, start, help } = this.commands;
    const { text } = msg;
    switch (text) {
      case links:
        this._generateLinkMsg(msg);
        break;
      case about:
        this._generateAboutMsg(msg);
        break;
      case start:
      case help:
        this._generateCommandMsg(msg, links, about);
        break;
      default:
        this._generateDefaultMsg(msg, help);
        break;
    }
  }
  processMsg(msg) {
    try {
      this._sendMessages(msg);
    } catch (err) {
      this.logger.logger.error(err.message);
      return err.message;
    }
  }
}

module.exports = Bot;
