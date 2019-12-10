'use strict';

let socket;

function init(url) {
   socket = new WebSocket(url);
   console.log('connecting...');
}

function registerOpenHandler(handlerFunction) {
   socket.onopen = () => {
      console.log('open');
      handlerFunction();
   };
}

function registerMessageHandler(handlerFunction) {
   console.log('registerMessageHandler');
   socket.onmessage = (e) => {   // ! не обрабатывается событие получения сообщения
      console.log('message', e.data);
      let data = JSON.parse(e.data);
      handlerFunction(data);
   };
}

function sendMessage(payload) {
   socket.send(JSON.stringify(payload));
}

export default {
   init,
   registerOpenHandler,
   registerMessageHandler,
   sendMessage
}
