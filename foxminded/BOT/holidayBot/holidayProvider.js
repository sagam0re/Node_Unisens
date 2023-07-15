const axios = require('axios');

class HolidayProvider {
  constructor(api, url) {
    this.api = api;
    this.url = url;
  }
  async getHoliday(country, text) {
    try {
      const now = new Date();
      const { data } = await axios.get(this.url, {
        params: {
          api_key: this.api,
          country,
          year: now.getFullYear(),
          month: now.getMonth() + 1,
          day: now.getDate(),
        },
      });
      return (
        data.map(({ name }) => name).join('\n') ||
        `${text} has no holiday today`
      );
    } catch (error) {
      return error.message;
    }
  }
}
module.exports = HolidayProvider;
