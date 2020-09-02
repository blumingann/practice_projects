const mongoose = require('mongoose');
const http = require('http');
const express = require('express');
const io = require('socket.io');
const setRoutes = require('./routes');
const setSocketHandlers = require('./sockets');

const PORT = process.env.PORT || 3500;
mongoose
  .connect('mongodb://localhost/chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    const app = express();

    setRoutes(app);

    const httpServer = http.createServer(app);

    const webSocketsServer = io(httpServer);

    webSocketsServer.on('connection', (socket) => {
      setSocketHandlers(socket);
    });

    httpServer.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
