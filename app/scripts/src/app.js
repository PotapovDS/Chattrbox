'use strict';

import socket from './ws-client';
import {UserStore, MessageStore, RoomStore} from './storage';
import {ChatForm, ChatList, UsersList, promptForUsername, changeRoom} from './dom';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';
const USERS_LIST_SELECTOR = '[users-list]';

// let messageStore = new MessageStore('x-chattrbox/m');
let userStore = new UserStore('x-chattrbox/u');
let roomStore = new RoomStore('x-chattrbox/r')

let username = userStore.get();
let room = roomStore.get();  // значение по умолчанию

// если в хранилище имен пусто, промптом запрашиваем пользователя ввести имя
if (!username) {
   username = promptForUsername();
   userStore.set(username);
}

changeRoom();

if (!room) {
   room = 'Main room';
   roomStore.set(room);
}

// сообщения будут храниться в базе на сервере, хранение сообщений пока уберем,
// они в любом случае будут хранитсья на странице, пока та не закроется
// function saveMessagesToStorage (message){ //------ сохраняем сообщения в sessionStore
//    messageStore.set(messageStore.get()+ ', ' + JSON.stringify(message.serialize()));
//    // console.log('messageStore', messageStore.get());
// }
//
// function sendMessageArchive (messageStore){
//    // рассылка архива сообщений из кэша sessonStore
// }

class ChatApp {
   constructor() {
      this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
      this.chatList = new ChatList(LIST_SELECTOR, username);
      this.usersList = new UsersList(USERS_LIST_SELECTOR, room);

      socket.init('ws://localhost:3001');

      // if (messageStore.get()) {
      //    // если в кэше есть какие-то сообщения запускаем событие, например
      //    // sendMessageArchive
      // }

      socket.registerOpenHandler(() => {
         this.chatForm.init((data) => { // data - значение из поля ввода сообщений
            let message = new ChatMessage({message: data});
            socket.sendMessage(message.serialize());
            // saveMessagesToStorage(message);
         });

         this.chatList.init();
      });

      // регистрация события отправки сообщения и отрисовка его на странице
      socket.registerMessageHandler((data) => {
         console.log('registerMessageHandler', data);
         let message = new ChatMessage(data);
         this.chatList.drawMessage(message.serialize());
      });

      // обрабатывается событие закрытия соединения с сервером
      socket.registerCloseHandler(() => {
         console.log('connection closed');
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
      user: u = username,
      room: r = room,
      timestamp: t = (new Date()).getTime()
   }) {
      this.message = m;
      this.user = u;
      this.timestamp = t;
      this.room = r;
   }
   serialize() { //сборка сообщения по шаблону
      return {
         user: this.user,
         message: this.message,
         timestamp: this.timestamp,
         room: this.room
      };
   }
}

export default ChatApp;
