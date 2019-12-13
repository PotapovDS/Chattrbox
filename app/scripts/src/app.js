'use strict';

import socket from './ws-client';
import {ChatForm} from './dom';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';

class ChatApp {
   constructor() {
      this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);

      socket.init('ws://localhost:3001');
      socket.registerOpenHandler(() => {
         this.chatForm.init((data) => {
            let message = new ChatMessage({message: data});
            socket.sendMessage(message.serialize());
         });
      });
      socket.registerMessageHandler((data) => {
         console.log(data);
      });
      socket.registerCloseHandler(() => {
         console.log('connection close');
         setInterval(() => {
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
