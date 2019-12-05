'use strict';
var WebSocket = require('ws');
var chatBot = new WebSocket('http://localhost:3001');

chatBot.isAuthorized = true;

chatBot.hello = function (socket){
   socket.send("Hello, i'm chat-bot Robo!" );
};

module.exports = chatBot;
