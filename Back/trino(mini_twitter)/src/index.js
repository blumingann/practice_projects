const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const userRoute = require('./routes/user.route');
const tweetRoute = require('./routes/tweet.route');
const sessionRoute = require('./routes/sessions.route');
const app = express();
const cors = require("cors");
const { handleError } = require("./errors");


const { PORT, MONGODB_CONNECTION, SECRET_KEY } = require('./config');

mongoose
  .connect(MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("La BD se inicializó correctamente.");

    app.use(cors());
    // middleware para req.body el json que viene en el body del request
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use("/users", userRoute);
    app.use("/sessions", sessionRoute);
    app.use("/tweets", tweetRoute);
    app.use((error, req, res, next) => {
      handleError(error, res);
    });
    console.log(PORT);
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error(err.message));