'use strict';

import socket from './ws-client';
import {UserStore, MessageStore} from './storage';
import {ChatForm, ChatList, promptForUsername} from './dom';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

let userStore = new UserStore('x-chatrtbox/u');
let messageStore = new MessageStore('x-chatrtbox/m');

let username = userStore.get();

if (!username) {
   username = promptForUsername();
   userStore.set(username);
}

function saveMessagesToStorage (message){ //------ сохраняем сообщения в sessionStore
   messageStore.set(messageStore.get()+ ', ' + JSON.stringify(message.serialize()));
   // console.log('messageStore', messageStore.get());
}

function sendMessageArchive (messageStore){
   // рассылка архива сообщений из кэша sessonStore
}

class ChatApp {
   constructor() {
      this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
      this.chatList = new ChatList(LIST_SELECTOR, username);

      socket.init('ws://localhost:3001');

      if (messageStore.get()) {
         // если в кэше есть какие-то сообщения запускаем событие, например
         // sendMessageArchive
      }

      socket.registerOpenHandler(() => {
         this.chatForm.init((data) => {
            let message = new ChatMessage({message: data});
            socket.sendMessage(message.serialize());
            saveMessagesToStorage(message);
         });

         this.chatList.init();
      });

      socket.registerMessageHandler((data) => {
         console.log('registerMessageHandler', data);
         let message = new ChatMessage(data);
         this.chatList.drawMessage(message.serialize());
      });

      socket.registerCloseHandler(() => {
         console.log('connection closed');
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
      user: u = username,
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
