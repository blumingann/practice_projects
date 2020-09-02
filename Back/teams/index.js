const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const logRoutes = require('./src/routes/log');
const checkJwt = require('express-jwt');
const { SECRET_KEY, SERVER_PORT, MONGODB_CONNECTION, SECRET_KEY } = require('./config');

const app = express();

mongoose
  .connect(MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Base de datos lista');

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(
      checkJwt({ secret: SECRET_KEY, algorithms: ['HS256'] }).unless({
        path: [/^\/log\//],
      })
    );

    app.use(morgan('dev'));

    app.use('/log', logRoutes);

    app.use((req, res, next) => {
      res.status(404).send('Not found');
    });

    app.use((err, req, res, next) => {
      if (err.name === 'ValidationError') {
        res.status(400).json({
          error: err.message,
        });
      } else {
        res.status(500).json({
          error: err.message,
        });
      }
    });

    app.listen(SERVER_PORT, () => {
      console.log(
        `Servidor listo para recibir conexiones en http://localhost:${SERVER_PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(error);

    mongoose.connection.close();
  });
