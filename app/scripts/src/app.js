/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */
import socket from './ws-client';
import { UserStore, MessageStore, RoomStore } from './storage';
import {
  ChatForm, ChatList, UsersList, RoomChanger, promptForUsername, changeRoom 
} from './dom';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';
const USERS_LIST_SELECTOR = '.users-list';
const ROOM_SELECTOR = '.dropdown-menu';

// let messageStore = new MessageStore('x-chattrbox/m');
const userStore = new UserStore('x-chattrbox/u');
const roomStore = new RoomStore('x-chattrbox/r');

let room = 0;
let username = userStore.get();

// если в хранилище имен пусто, промптом запрашиваем пользователя ввести имя
if (!username) {
  username = promptForUsername();
  userStore.set(username);
}

if (!room) {
  room = 'Main room';
  roomStore.set(room);
}

class ChatApp {
  constructor() {
    this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
    this.chatList = new ChatList(LIST_SELECTOR, username);
    this.usersList = new UsersList(USERS_LIST_SELECTOR, room);
    this.roomChanger = new RoomChanger(ROOM_SELECTOR, room);

    socket.init('ws://localhost:3001');

    socket.registerOpenHandler(() => {
      this.chatForm.init((data) => { // data - значение из поля ввода сообщений
        // eslint-disable-next-line no-use-before-define
        const message = new ChatMessage({ message: data });
        socket.sendMessage(message.serialize());
      });

      // меняем значение room новое значение получаем из обработчика
      // dropdown
      this.roomChanger.init((data) => {
        // здесь предаем данные на сервер о смене комнаты
        room = data;
        roomStore.set(room); // меняем значение комнаты в session store
        const messageToChangeRoom = {
          systemMessage: true,
          room,
          user: userStore.get(),
        };
        socket.sendMessage(messageToChangeRoom);
      });

      this.chatList.init();

      // this.usersList.drawUsers(users); // сюда нужно передать список юзеров из БД с сервера
    });

    // регистрация события отправки сообщения и отрисовка его на странице
    socket.registerMessageHandler((data) => {
      //  при регистраци ответа от сервера можно проверить тип ответа -
      // просто сообщение или системное со списком юзеров
      console.log('registerMessageHandler', data.usersList);
      if (data.systemMessage) {
        this.usersList.drawUsersList(data.usersList);
      } else {
        // eslint-disable-next-line no-use-before-define
        const message = new ChatMessage(data);
        if (message.room === roomStore.get()) {
          this.chatList.drawMessage(message.serialize());
        }
      }
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
    systemMessage: s = false,
    message: m,
    user: u = username,
    room: r = room,
    timestamp: t = (new Date()).getTime(),
  }) {
    this.systemMessage = s;
    this.message = m;
    this.user = u;
    this.timestamp = t;
    this.room = r;
  }

  serialize() { // сборка сообщения по шаблону
    return {
      systemMessage: this.systemMessage,
      user: this.user,
      message: this.message,
      timestamp: this.timestamp,
      room: this.room,
    };
  }
}

export default ChatApp;
