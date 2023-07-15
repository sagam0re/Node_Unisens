const Telegram = require('node-telegram-bot-api');
const { aboutBot, linkedin, gitLab } = require('./links');

class Bot {
  constructor(token) {
    this.token = token;
    this.bot = new Telegram(token, { polling: true });
    this.commands = {
      links: '/links',
      about: '/about',
      start: '/start',
      help: '/help',
    };
  }

  generateLinkMsg(msg) {
    const { chat } = msg;
    this.bot.sendMessage(chat.id, `linkedin: ${linkedin}\nGitLab: ${gitLab}`);
  }
  generateAboutMsg(msg) {
    const { chat } = msg;
    this.bot.sendMessage(chat.id, `${aboutBot}`);
  }
  generateCommandMsg(msg, comm1, comm2) {
    const { chat } = msg;
    this.bot.sendMessage(
      chat.id,
      `Here are list of commands \n${comm1}\n${comm2}`
    );
  }
  generateDefaultMsg(msg, command) {
    const { chat } = msg;
    this.bot.sendMessage(chat.id, `Here are valid commands ${command}`);
  }

  sendMessages(msg) {
    const { links, about, start, help } = this.commands;
    const { text } = msg;
    switch (text) {
      case links:
        this.generateLinkMsg(msg);
        break;
      case about:
        this.generateAboutMsg(msg);
        break;
      case start:
      case help:
        this.generateCommandMsg(msg, links, about);
        break;
      default:
        this.generateDefaultMsg(msg, help);
        break;
    }
  }

  processMsg(msg) {
    try {
      this.sendMessages(msg);
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = Bot;
