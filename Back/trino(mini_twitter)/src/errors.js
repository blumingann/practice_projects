class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err;

  res.status(statusCode || 500).json({
    message: message || 'Internal Server Error',
  });
};

module.exports = {
  ErrorHandler,
  handleError,
};
