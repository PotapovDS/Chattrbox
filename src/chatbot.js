'use strict';

// чат бот по имени Robo, автоматически подключается к среверу чата, реагирует на сообщения со своим именем
var WebSocket = require('ws');
var chatBot = new WebSocket('http://localhost:3001');
var clients = new Set();

chatBot.isAuthorized = true;

chatBot.sayHelloToNewUser = function(socket) {
   socket.send("Hello, i'm chat-bot Robo!");
   clients.add(socket);
};

chatBot.listenMessage = function(message, socket) {
   var ansverMessage = "i don't understand you, sorry";

   if (message.indexOf("kill all humans") !== -1) {
      ansverMessage = "Hello brother!";
   };

   if (message.indexOf("fool") !== -1 || message.indexOf("stupid") !== -1) {
      ansverMessage = "I'm watching you, meatbag!";
   };

   // socket.send('Can i help you?');
   clients.forEach((client) => {
      if (client !== chatBot && client.readyState === WebSocket.OPEN) {
         client.send(ansverMessage);
      }
   });
};

module.exports = chatBot;
