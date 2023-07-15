const { find } = require('geo-tz');
const moment = require('moment-timezone');

class TimeConverter {
  convertingTime(time, lat, lon) {
    try {
      const localTimeZone = find(lat, lon);
      const convertedTime = moment
        .tz(time, 'HH:mm', localTimeZone[0])
        .utc()
        .format('HH:mm');
      return convertedTime;
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = TimeConverter;
