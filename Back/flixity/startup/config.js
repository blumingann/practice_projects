const config = require('config');

module.exports = function () {
  if (!config.get('SECRET_KEY')) {
    throw new Error('FATAL ERROR: JWT SECRET_KEY is not defined.');
  }
}