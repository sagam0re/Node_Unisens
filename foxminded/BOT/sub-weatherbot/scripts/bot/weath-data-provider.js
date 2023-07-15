const axios = require('axios');

class WeatherDataProvider {
  constructor(api) {
    this.api = api;
  }

  _accessDataURL(api, lat, lon) {
    return `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&units=metric`;
  }

  async getLocalWeather(lat, lon) {
    const gettingData = this._accessDataURL(this.api, lat, lon);
    const locWeather = await axios(gettingData);
    return locWeather.data.main.temp;
  }
}

module.exports = WeatherDataProvider;
