# Chattrbox

перед запусом приложения не забудь сделать npm install

Chat  = browser app + server

start: npm run dev

babel: npm run watch


использован модуль WebSocets, для обработки сообщений

модуль moment для управлением отображения времени отправки сообщения

cripti-js/md5 для хэширования пути

иконки юзеров бререм с gravatar.com


для эмуляции подключения клиента к серверу исп утилита wscat

wscat -c ws://localhost:3001

____________________________________________


задача: создать возможнось добавлять и переключаться между разными комнатами

1. добавить блок в котором моно выбрать комнату и видеть пользователей, которые в этой комнате есть

   логика хранения сообщений в базе:

   сохранять активных пользователей сайта. Либо создать отдельное событие при регистрации.
   Либо при каждом сообщении проводить проверку на уникальность пользователя(что не эффективно).

   У каждого пользователя должна быть привязка к комнате в которой он находится,
   и при смене комнаты запись в базе по пользователю должна обновляться.

   обработка сообщений происходит на стороне сервера (WebSocketServer)
   сообщения сохраняются в базе данных в виде объекта Message, у сообщения есть
   тэги пользователя написавшего его и комнаты, в которой сообщение было создано.

   Необходимо организовать рассылку сообщений. Для этого, при подключении пользователя
   или при переходе пользователя в другую комнату из базы выбирались только сообщения,
   созданные в этой комнате.

   Соответственно нужно настроить обработку события смены комнаты.

   Событие должно обновлять поле сообщений и поле активных юзеров в комнате



4. добавить общую валидацию пользователя и возможнось создавать закрытые комнаты с сообственным паролем(каждой комнате должен соответствовать свой объек с данными - пароль, пользователи и сообщения)
