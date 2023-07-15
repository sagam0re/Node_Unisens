const Logger = require('../logger/logger');

class WeathMsgProvider {
  constructor() {
    this.log = new Logger();
  }
  getInvalidMsg(start, about, sub) {
    const randomMsg = `<b>Here are valid commands: \n<i>${start}\n${about}\n${sub}</i></b>`;
    return randomMsg;
  }
  getAboutMsg(sub) {
    const aboutMsg = `<i>I'm <b>subscriber bot</b>\n\nPress  ${sub}  and send me the time\nwhen you want to get updated weather</i>`;
    return aboutMsg;
  }

  getStartMsg() {
    const startMsg =
      '<i>Please, send your location\nto get weather info around you</i>';
    return startMsg;
  }

  getSubMsg() {
    const subMsg = '<i>Choose your time\n\nFormat:   <b>HH:MM</b></i>';
    return subMsg;
  }

  getSubTime() {
    const subMsg = `<i>Your subscription time has set</i>`;
    this.log.info(`User has subscribed Bot`);
    return subMsg;
  }

  getLocationMsg(weather) {
    const locationText = `<i>Weather on your location is ${weather} C\xB0\n</i>`;
    return locationText;
  }
}

module.exports = WeathMsgProvider;
