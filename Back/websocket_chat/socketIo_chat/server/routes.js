const User = require('./models/user.model');
const Message = require('./models/message.model');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client.html');
  });

  app.get('/users', (req, res) => {
    User.find()
      .then((userDocs) => {
        res.json(userDocs);
      })
      .catch((error) => {
        res.sendStatus(400).json(error.message);
      });
  });

  app.get('/messages', (req, res) => {
    Message.find()
      .then((userDocs) => {
        res.json(userDocs);
      })
      .catch((error) => {
        res.sendStatus(400).json(error.message);
      });
  });
};
