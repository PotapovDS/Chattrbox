'use strict';
//  работа с DOM, отображение элементов и данных из формы
import $ from 'jquery';
import md5 from 'crypto-js/md5';
import moment from 'moment';

function createGravatarUrl(username) {
   let userhash = md5(username);
   return `http://www.gravatar.com/avatar/${userhash.toString()}`;
}

//запрашиваем имя пользователя
export function promptForUsername() {
   let username = prompt('Enter a username');
   return username.toLowerCase();
}

export class UsersList {
  constructor(formSel, room) {
    this.$form = $(formSel);
    this.room = room;
  }

  drawUsers(users){
    let $usersList = $('<p>');
    users.forEach((user) => {
      $usersList.append($('<span>', {
         'class': 'username',
         text: user
      }));
    });

      this.$form.append($usersList);
  }
  // обработка отображения списка юзеров в комнате room
  // сначала удаляем старый список, затем рисуем новый
}

// обработка выбора комнаты
export class RoomChanger {
  constructor(formSel, room){
    this.$form = $(formSel);
    this.room = room;
  }
  init(submitCallback) {
    this.$form.on('click', (e) => {
      if (this.room !== e.target.text) {
        this.room = e.target.text;

        $('.this-room-name').text(this.room);
        $('[data-chat="message-list"]').append($('<div>', {
           'class': 'message-newRoom',
           text: 'Welcome to ' + this.room
        }));
      }
      submitCallback(this.room);
    });
  }
}

export class ChatForm {
   constructor(formSel, inputSel) {
      this.$form = $(formSel);
      this.$input = $(inputSel);
   }

   init(submitCallback) {
      this.$form.submit((event) => {
         event.preventDefault();
         let val = this.$input.val();
         submitCallback(val);
         this.$input.val('');
      });

      this.$form.find('button').on('click', () => this.$form.submit());
   }
}

//отрисовка сообщений на экране сообщений
export class ChatList {
   constructor(listSel, username) {
      this.$list = $(listSel);
      this.username = username;
   }

   drawMessage({user: u, timestamp: t, message: m}) {
      let $messageRow = $('<li>', {
         'class': 'message-row'
      });

      if (this.username === u) {
         $messageRow.addClass('me');
      }

      let $message = $('<p>');

      $message.append($('<span>', {
         'class': 'message-username',
         text: u
      }));

      $message.append($('<span>', {
         'class': 'timestamp',
         'data-time': t,
         text: moment(t).fromNow()
      }));

      $message.append($('<span>', {
         'class': 'message-message',
         text: m
      }));

      let $img = $('<img>', {
         src: createGravatarUrl(u),
         title: u
      });

      $messageRow.append($img);
      $messageRow.append($message);
      this.$list.append($messageRow);
      // атрибут и значение t - разные типы, для сравнения исп == для приведения типов
      if ($messageRow.find('.timestamp').attr('data-time') == t) {
         $messageRow.hide().fadeIn();
      }

      $messageRow.get(0).scrollIntoView();
   }

   //форматирование индикатора даты
   init() {
      this.timer = setInterval(() => {
         $('[data-time]').each((idx, element) => {
            let $element = $(element);
            let timestamp = new Date().setTime($element.attr('data-time'));
            let ago = moment(timestamp).fromNow();
            $element.html(ago);
         });
      }, 1000);
   }
}
