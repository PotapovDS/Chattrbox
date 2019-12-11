'use strict';

import socket from './ws-client';

class ChatApp {
   constructor() {
      socket.init('ws://localhost:3001');

      socket.registerOpenHandler(() => {
         let message = new ChatMessage({
            message: 'pow!'
         });
         socket.sendMessage(message.serialize());
      });
      socket.registerMessageHandler((data) => {
         console.log(data);
      });
      socket.registerCloseHandler(() => {
         console.log('connection close');
         setTimeout(() => {
            console.log('attempt to connect');
            socket.init('wss://localhost:3001');
         }, 3000);
      });
   }
}

class ChatMessage {
   constructor({
      message: m,
      user: u = 'batman',
      timestamp: t = (new Date()).getTime()
   }) {
      this.message = m;
      this.user = u;
      this.timestamp = t;
   }
   serialize() {
      return {
         user: this.user,
         message: this.message,
         timestamp: this.timestamp
      };
   }
}

export default ChatApp;
