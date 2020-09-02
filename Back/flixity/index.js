const config = require('config')
const { handleError } = require("./errors");
const winston = require('winston');
const express = require('express');
const app = express();

// const morgan = require('morgan');

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);

app.use((error, req, res, next) => {
  handleError(error, res);
});
const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;