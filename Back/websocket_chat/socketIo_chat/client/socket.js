const client = io.connect('http://localhost:3500/');
let username = '';

const sendMessage = (input, event) => {
  event.preventDefault();
  client.emit('new-message', input.value);
  addMessage(input.value);
  input.value = '';
};

const addMessage = (newMessage) => {

  $('#messages').append(getIncomingMessageDom({
    message: {
      text: newMessage,
      time: Date.now()
    }
  }));
};


client.on('new-message-ok', (newMessage) => {
  $('#messages').append(getOutgoingMessageDom({ message: newMessage }));
});

const setUsername = (input, event) => {
  event.preventDefault();
  username = input.value;
  client.emit('set-username', username);
  input.value = '';
  $('#actual-username').text(username);
};

const getIncomingMessageDom = ({ message }) =>
  `<div class="incoming_msg">
      <div class="incoming_msg_img">
        <img
          src="https://ptetutorials.com/images/user-profile.png"
          alt="sunil"
        />
      </div>
      <div class="received_msg">
        <div class="received_withd_msg">
          <p>${message.text}</p>
          <span class="time_date"> ${message.time}</span>
        </div>
      </div>
    </div>`;

const getOutgoingMessageDom = ({ message }) =>
  `<div class="outgoing_msg">
    <div class="sent_msg">
      <p>${message.text}</p>
      <span class="time_date"> ${message.time}</span>
    </div>
  </div>`;
