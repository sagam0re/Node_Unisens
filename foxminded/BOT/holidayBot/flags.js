const { countryCodeEmoji } = require('country-code-emoji');

const countryCodeArr = ['us', 'ru', 'ge', 'ua', 'it', 'nz'];
const flags = countryCodeArr.map(countryCodeEmoji);
const [US, RU, GE, UA, IT, NZ] = flags;

module.exports = { US, RU, GE, UA, IT, NZ };
