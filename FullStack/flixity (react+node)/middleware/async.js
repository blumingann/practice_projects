// To remove evrery Try Catch block from the route handlers and make code cleaner

module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (err) {
      next(err.message)
    }
  }
}