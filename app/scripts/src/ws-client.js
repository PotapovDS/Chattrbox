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
  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    handlerFunction(data);
  };
}

function sendMessage(payload) {
  socket.send(JSON.stringify(payload));
}

// функция обработки закрытия соединения
function registerCloseHandler(handlerFunction) {
  socket.onclose = (e) => {
    console.log(e);
    handlerFunction();
  };
}

export default {
  init,
  registerOpenHandler,
  registerMessageHandler,
  sendMessage,
  registerCloseHandler,
};
