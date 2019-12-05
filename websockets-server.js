'use strict';
var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
   port: port
});

var password = 'swordfish';
var messages = []; // хранилище сообщений

console.log('websockets server started');

ws.on('connection', (socket) => {
   console.log('client connection established');
   socket.send('enter the password');

   messages.forEach((msg) => {  //рассылаем архив сообщений новому подключению
      socket.send(msg);
   });

// эхо сервер
   socket.on('message', (data) => {  // при получении сообщения добавляем его в хранилище
      console.log('message received: ' + data);
      messages.push(data);
      ws.clients.forEach((clientSocket) => {
         clientSocket.send(data);
      });

   });
});
