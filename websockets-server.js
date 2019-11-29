var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
   port: port
});

var messages = []; // хранилище сообщений

console.log('websockets server started');

ws.on('connection', (socket) => {
   console.log('client connection established');

   messages.forEach((msg) => {
      socket.send(msg);
   });

   socket.on('message', (data) => {
      console.log('message received: ' + data);
      messages.push(data);
      ws.clients.forEach((clientSocket) => {
         clientSocket.send(data);
      });

   });
});
