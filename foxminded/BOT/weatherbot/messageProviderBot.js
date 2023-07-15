class messageProviderBot {
  constructor(start, about) {
    this.start = start;
    this.about = about;
  }
  getRandomMsg() {
    const randomMsg = `<b>Here are valid commands: \n<i>${this.start}\n${this.about}</i></b>`;
    return randomMsg;
  }
  getAboutMsg() {
    const aboutMsg =
      '<i>This is <b>weather bot</b> which send weather info depended upon your location</i>';
    return aboutMsg;
  }

  getStartMsg() {
    const startMsg =
      '<i>Please, send your location\nto get weather info around you</i>';
    return startMsg;
  }

  getLocationMsg(name, weather) {
    const locationText = `<i>${name}, Weather in your place is ${weather}\xB0</i>`;
    return locationText;
  }
}

module.exports = messageProviderBot;
