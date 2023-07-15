const User = require('../mogooseDB/user-schema');
const TimeConv = require('./time-converter');
const logger = require('../logger/logger');

class UserService {
  constructor(db_uri) {
    this.uri = db_uri;
    this.converter = new TimeConv();
    this.log = new logger();
  }

  async registUser(msg) {
    const time = msg.date;
    const chatId = msg.chat.id;
    const location = msg.location;
    await User.updateOne(
      { chatId: chatId },
      { time, location },
      { upsert: true }
    );
    this.log.info('User is saved in DB');
  }

  async updateUser(msg) {
    try {
      const time = msg.text;
      const chatId = msg.chat.id;
      const avalUser = await User.find({ chatId: chatId });
      const { latitude, longitude } = avalUser[0].location;
      const convertedTime = this.converter.convertingTime(
        time,
        latitude,
        longitude
      );
      await User.updateOne(
        { chatId: chatId },
        {
          time: convertedTime,
        }
      );
      this.log.info(`User data has been Updated`);
    } catch (err) {
      this.log.error(err.message);
      return err.message;
    }
  }
}

module.exports = UserService;
