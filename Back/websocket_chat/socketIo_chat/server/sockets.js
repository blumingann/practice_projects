const User = require('./models/user.model');
const Message = require('./models/message.model');
const dateFormat = require('dateformat');


module.exports = (socket) => {
  socket.on('set-username', async (payload) => {
    try {
      await User.findOneAndUpdate(
        { name: payload },
        { name: payload, socket: socket.id },
        {
          upsert: true,
        }
      );
    } catch (error) {
      socket.emit('set-username-lame', error.message);
    }
  });

  socket.on('new-message', async (payload) => {
    try {
      const userDoc = await User.findOne({ socket: socket.id });
      const messageDoc = await Message.create({
        text: payload,
        user: userDoc._id,
      });
      const user = await User.findByIdAndUpdate(userDoc._id, {
        $push: { messages: messageDoc._id },
      });
      const msgTime = dateFormat(messageDoc.createdAt, "mmmm, dd - HH:MM");

      const msg = {
        text: `${user.name}: ${payload}`,
        time: msgTime,
      }
      socket.broadcast.emit('new-message-ok', msg);
    } catch (error) {
      socket.emit('new-message-lame', error.message);
    }
  });

  socket.on('disconnect', () => {
    User.findOne({ socket: socket.id })
      .then((userDoc) => {
        if (userDoc) {
          console.log(`User ${userDoc._id} disconnected.`);
          const timestamp = new Date().toISOString();
          const message = `[${timestamp}][${userDoc.name}]: Bye bye!`;
          socket.broadcast.emit('new-message-ok', message);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  });
};
