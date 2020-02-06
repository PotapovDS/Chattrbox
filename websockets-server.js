'use strict';

// const User = require('./mongodb/schemas/User');
// const Message = require('./mongodb/schemas/Message');

const {User, Message} = require('./mongodb');
// const Message = require('./mongodb');

var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
// var chatBot = require('./src/chatbot');
var port = 3001;
var ws = new WebSocketServer({
  port: port
});

var password = 'swordfish'; // общий пароль доступа к чату
var messages = []; // хранилище сообщений
var user = []; // список пользователей

console.log('websockets server started');

// function sendMessagesArchive(socket) { //рассылаем архив сообщений новому подключению
//   messages.forEach((msg) => {
//     socket.send(msg);
//   });
// };

// добавляем в базу только нового пользователя
function registerNewUser(users, messageData) {
  if (users.length === 0) {
    const newUser = new User({
      username: messageData.user,
      room: messageData.room
    });

    newUser.save((err, user) => {
      if (err) {
        console.log('err', err)
      }
      console.log('saved user: \n', user)
    });
  }
}

ws.on('connection', (socket) => {
  console.log('client connection established');

  // chatBot.sayHelloToNewUser(socket);
  // socket.send('enter the password');

  // if (socket.isAuthorized) {
  // };
  // возможно лишняя функция, нет смысла отправлять весь архив новому пользователю
  // sendMessagesArchive(socket);

  // эхо сервер
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
      // сообщение - data приходит в виде строки, необходимо парсить его
      // надо распарсить в объект, чтобы потом его разложить по схемам user и message

      let messageData = JSON.parse(data);

      //--------------тест базы данных -начало--------
      User.find({
        username: messageData.user
      }).exec(function(err, users) {
        if (err) throw err;
        registerNewUser(users, messageData);
      });

      const newMessage = new Message({
        text: messageData.message,
        username: messageData.user,
        room: messageData.room,
        timestamp: messageData.timestamp
      });

      newMessage.save((err, message) => {
        if (err) {
          console.log('err', err);
        }
        console.log(`saved message: \n ${messageData.user} : ${messageData.message} in ${messageData.room}`);
      });

      //--------------тест базы данных -конец--------

      // рассылка сообщений каждому клиенту
      messages.push(data);
      ws.clients.forEach((clientSocket) => {
        // if (clientSocket.isAuthorized) {
        clientSocket.send(data);
        // };
      });
      // если в сообщении есть обращение к боту, сообщение передается
      // на обработку чатботу, и данные пользователя, которому нужно направить ответ
      // if (data.indexOf('Robo') !== -1) {
      //    chatBot.listenMessage(data, socket);
      // }

    };
  });

  socket.on('close', (event) => {
    console.log('connection is closed' + event);
  });

});
