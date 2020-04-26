const WebSocket = require('ws');
const { User, Message } = require('./mongodb');

const WebSocketServer = WebSocket.Server;
const port = 3001;
const ws = new WebSocketServer({ port });

// var password = 'swordfish'; // общий пароль доступа к чату
let messages = []; // хранилище сообщений
let users = []; // список пользователей
let usersList;

console.log('websockets server started');

function registerNewUser(thisUser, messageData) { // добавляем в базу только нового пользователя
  const newUser = new User({
    username: messageData.user,
    room: messageData.room,
  });
  newUser.save((err, newUser) => {
    if (err) {
      console.log('err', err);
    }
    console.log('saved user: \n', newUser);
  });

  users.push(newUser.username);
}

async function drawUsersList(room) { // отправляем обновленный список юзеров
  await User.find({ // await - необходимо завершить поиск, до возврата результата
    room,
  }, (err, findUsers) => {
    if (err) throw err;
    usersList = findUsers;
  });
  console.log(`мы нашли список пользователей в комнате ${room}: ${usersList}`);
}

function updateUser(messageData) {
  User.findOne({
    username: messageData.user,
  }, (err, updatedUser) => {
    if (err) throw err;
    console.log('updating user');
    updatedUser.room = messageData.room;
    updatedUser.save();
  });
}

function saveNewMessage(messageData) {
  const newMessage = new Message({
    text: messageData.message,
    username: messageData.user,
    room: messageData.room,
    timestamp: messageData.timestamp,
  });

  newMessage.save((err, message) => {
    if (err) {
      console.log('err', err);
    }
    console.log(`saved message: \n ${messageData.user} : ${messageData.message} in ${messageData.room}`);
  });
}

ws.on('connection', (socket) => {
  console.log('client connection established');

  socket.on('message', (data) => { // при получении сообщения добавляем его в хранилище
    // временно убрал требование авторизации для подключения, потом завернуть этот кусок в функцию
    // if (!socket.isAuthorized) {
    //    if (data === password) {
    //       socket.isAuthorized = true;
    //       socket.send('Welcome to CHATTRBOX!');
    //       sendMessagesArchive(socket);
    //    } else {
    //       socket.send('you are not Authorized, please enter the password:');
    //    };
    // } else

    {
      let messageData = JSON.parse(data);

      // проверяем есть ли юзер в базе
      User.findOne({
        username: messageData.user,
      }).exec((err, thisUser) => {
        if (err) throw err;
        if (thisUser === null) {
          registerNewUser(thisUser, messageData);
        }
      });

      // проверяем сообщение, системное или нет
      if (messageData.systemMessage) {
        updateUser(messageData);
        // нужно взять комнату из messageData и передать в drawUsersList
        drawUsersList(messageData.room).then();
        const systemCallback = {
          usersList,
          user: messageData.user,
          systemMessage: true,
        };
        // eslint-disable-next-line no-param-reassign
        data = JSON.stringify(systemCallback);
        // системное сообщение говорит о смене комнаты
        // значит здесь можно инициировать отправку ws клиенту сообщения со списком юзеров
      } else {
        saveNewMessage(messageData);
        messages.push(data); // если сообщение не системное,сохраняем с пользовательскими сообщениями
      }
      // рассылка сообщений каждому клиенту
      ws.clients.forEach((clientSocket) => {
        // if (clientSocket.isAuthorized) {
        clientSocket.send(data);
        // };
      });

    };
  });

  socket.on('close', (event) => {
    console.log(`connection is closed ${event}`);
  });
});
