'use strict';
const { User, Message } = require('./mongodb');

var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({ port: port });

// var password = 'swordfish'; // общий пароль доступа к чату
var messages = []; // хранилище сообщений
var users = []; // список пользователей

console.log('websockets server started');

function registerNewUser(thisUser, messageData) { // добавляем в базу только нового пользователя
  const newUser = new User({
    username: messageData.user,
    room: messageData.room
  });
  newUser.save((err, newUser) => {
    if (err) {
      console.log('err', err)
    }
    console.log('saved user: \n', newUser)
  });

  users.push(newUser.username);
}

function drawUsersList(room){ // оправляем обновленный список юзеров, в указанной комнае, клиенту
  User.find({
    room: room
  }, (err, users) => {
    if (err) return handleError(err);
    // отправка списка users
  });
}

function updateUser(messageData) {
  User.findOne({
    username: messageData.user
  }, (err, updatedUser) => {
    if (err) return handleError(err);
    console.log('updating user');
    updatedUser.room = messageData.room;
    updatedUser.save();
    });
}

function saveNewMessage(messageData){
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
      // сообщение - data приходит в виде строки, необходимо парсить его
      // надо распарсить в объект, чтобы потом его разложить по схемам user и message
      console.log('soket on message - data', data);

      let messageData = JSON.parse(data);

      // проверяем есть ли юзер в базе
      User.findOne({
        username: messageData.user
      }).exec(function(err, thisUser) {
        if (err) throw err;
        if (thisUser === null) {
          registerNewUser(thisUser, messageData);
        };
      });

      //проверяем сообщение, системное или нет
      if (messageData.systemMessage){
        updateUser(messageData);
        // системное сообщение говорит о смене комнаты
        // значит здесь можно инициировать отправку ws клиенту сообщения со списком юзера
        // но нам нужно отправить только тому сокету, на который отправлено сообщение
        console.log('попробуем узнать можно ли выяснить нужный на сокет', ws);
      } else {
        saveNewMessage(messageData);
      }

      // рассылка сообщений каждому клиенту
      messages.push(data);
      ws.clients.forEach((clientSocket) => {
        // if (clientSocket.isAuthorized) {
        clientSocket.send(data);
        console.log('clientSocket', clientSocket);
        // };
      });

    };
  });

  socket.on('close', (event) => {
    console.log('connection is closed' + event);
  });

});
