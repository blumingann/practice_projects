const winston = require('winston');

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {

  winston.error(err.message, err);

  const { statusCode, message } = err;

  res.status(statusCode).json({
    message: message,
  });
};

module.exports = {
  ErrorHandler,
  handleError,
};