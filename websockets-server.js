'use strict';
var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
   port: port
});

var password = 'swordfish'; // общий пароль доступа к чату
var messages = []; // хранилище сообщений

console.log('websockets server started');

function sendMessageArchive(socket) { //рассылаем архив сообщений новому подключению
   messages.forEach((msg) => {
      socket.send(msg);
   });
};

ws.on('connection', (socket) => {
   console.log('client connection established');
   socket.send('enter the password');

   if (socket.isAuthorized) {
      sendMessageArchive(socket);
   };

   // эхо сервер
   socket.on('message', (data) => { // при получении сообщения добавляем его в хранилище

      if (!socket.isAuthorized) {
         if (data === password) {
            socket.isAuthorized = true;
            socket.send('Welcome to CHATTRBOX!');
            sendMessageArchive(socket);
         } else {
            socket.send('you are not Authorized, please enter the password:');
         };
      } else {
         console.log('message received: ' + data);
         messages.push(data);
         ws.clients.forEach((clientSocket) => {
            if (clientSocket.isAuthorized) {
               clientSocket.send(data);
            };
         });
      };

   });

});

ws.on('close', (event) => {
   console.log(event.reason);
});
