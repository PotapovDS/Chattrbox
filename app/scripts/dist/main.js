(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _wsClient = _interopRequireDefault(require("./ws-client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChatApp = function ChatApp() {
  _classCallCheck(this, ChatApp);

  _wsClient["default"].init('ws://localhost:3001');

  _wsClient["default"].registerOpenHandler(function () {
    var message = new ChatMessage({
      message: 'pow!'
    });

    _wsClient["default"].sendMessage(message.serialize());
  });

  _wsClient["default"].registerMessageHandler(function (data) {
    console.log(data);
  });
};

var ChatMessage =
/*#__PURE__*/
function () {
  function ChatMessage(_ref) {
    var m = _ref.message,
        _ref$user = _ref.user,
        u = _ref$user === void 0 ? 'batman' : _ref$user,
        _ref$timestamp = _ref.timestamp,
        t = _ref$timestamp === void 0 ? new Date().getTime() : _ref$timestamp;

    _classCallCheck(this, ChatMessage);

    this.message = m;
    this.user = u;
    this.timestamp = t;
  }

  _createClass(ChatMessage, [{
    key: "serialize",
    value: function serialize() {
      return {
        user: this.user,
        message: this.message,
        timestamp: this.timestamp
      };
    }
  }]);

  return ChatMessage;
}();

var _default = ChatApp;
exports["default"] = _default;

},{"./ws-client":3}],2:[function(require,module,exports){
"use strict";

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

new _app["default"]();

},{"./app":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var socket;

function init(url) {
  socket = new WebSocket(url);
  console.log('connecting...');
}

function registerOpenHandler(handlerFunction) {
  socket.onopen = function () {
    console.log('open');
    handlerFunction();
  };
}

function registerMessageHandler(handlerFunction) {
  console.log('registerMessageHandler');

  socket.onmessage = function (e) {
    // ! не обрабатывается событие получения сообщения
    console.log('message', e.data);
    var data = JSON.parse(e.data);
    handlerFunction(data);
  };
}

function sendMessage(payload) {
  socket.send(JSON.stringify(payload));
}

var _default = {
  init: init,
  registerOpenHandler: registerOpenHandler,
  registerMessageHandler: registerMessageHandler,
  sendMessage: sendMessage
};
exports["default"] = _default;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvYXBwLmpzIiwiYXBwL3NjcmlwdHMvc3JjL21haW4uanMiLCJhcHAvc2NyaXB0cy9zcmMvd3MtY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7Ozs7QUFFQTs7Ozs7Ozs7OztJQUVNLE8sR0FDSCxtQkFBYztBQUFBOztBQUNYLHVCQUFPLElBQVAsQ0FBWSxxQkFBWjs7QUFFQSx1QkFBTyxtQkFBUCxDQUEyQixZQUFNO0FBQzlCLFFBQUksT0FBTyxHQUFHLElBQUksV0FBSixDQUFnQjtBQUFDLE1BQUEsT0FBTyxFQUFFO0FBQVYsS0FBaEIsQ0FBZDs7QUFDQSx5QkFBTyxXQUFQLENBQW1CLE9BQU8sQ0FBQyxTQUFSLEVBQW5CO0FBQ0YsR0FIRDs7QUFJQSx1QkFBTyxzQkFBUCxDQUE4QixVQUFDLElBQUQsRUFBVTtBQUNyQyxJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksSUFBWjtBQUNGLEdBRkQ7QUFHRixDOztJQUdFLFc7OztBQUNILDZCQUlHO0FBQUEsUUFIUyxDQUdULFFBSEEsT0FHQTtBQUFBLHlCQUZBLElBRUE7QUFBQSxRQUZNLENBRU4sMEJBRlUsUUFFVjtBQUFBLDhCQURBLFNBQ0E7QUFBQSxRQURXLENBQ1gsK0JBRGdCLElBQUksSUFBSixFQUFELENBQWEsT0FBYixFQUNmOztBQUFBOztBQUNBLFNBQUssT0FBTCxHQUFlLENBQWY7QUFDQSxTQUFLLElBQUwsR0FBWSxDQUFaO0FBQ0EsU0FBSyxTQUFMLEdBQWlCLENBQWpCO0FBQ0Y7Ozs7Z0NBQ1c7QUFDVCxhQUFPO0FBQ0osUUFBQSxJQUFJLEVBQUUsS0FBSyxJQURQO0FBRUosUUFBQSxPQUFPLEVBQUUsS0FBSyxPQUZWO0FBR0osUUFBQSxTQUFTLEVBQUUsS0FBSztBQUhaLE9BQVA7QUFLRjs7Ozs7O2VBR1csTzs7Ozs7O0FDckNmOzs7O0FBQ0EsSUFBSSxlQUFKOzs7QUNEQTs7Ozs7O0FBRUEsSUFBSSxNQUFKOztBQUVBLFNBQVMsSUFBVCxDQUFjLEdBQWQsRUFBbUI7QUFDaEIsRUFBQSxNQUFNLEdBQUcsSUFBSSxTQUFKLENBQWMsR0FBZCxDQUFUO0FBQ0EsRUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGVBQVo7QUFDRjs7QUFFRCxTQUFTLG1CQUFULENBQTZCLGVBQTdCLEVBQThDO0FBQzNDLEVBQUEsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsWUFBTTtBQUNuQixJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksTUFBWjtBQUNBLElBQUEsZUFBZTtBQUNqQixHQUhEO0FBSUY7O0FBRUQsU0FBUyxzQkFBVCxDQUFnQyxlQUFoQyxFQUFpRDtBQUM5QyxFQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksd0JBQVo7O0FBQ0EsRUFBQSxNQUFNLENBQUMsU0FBUCxHQUFtQixVQUFDLENBQUQsRUFBTztBQUFJO0FBQzNCLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLENBQUMsQ0FBQyxJQUF6QjtBQUNBLFFBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFMLENBQVcsQ0FBQyxDQUFDLElBQWIsQ0FBWDtBQUNBLElBQUEsZUFBZSxDQUFDLElBQUQsQ0FBZjtBQUNGLEdBSkQ7QUFLRjs7QUFFRCxTQUFTLFdBQVQsQ0FBcUIsT0FBckIsRUFBOEI7QUFDM0IsRUFBQSxNQUFNLENBQUMsSUFBUCxDQUFZLElBQUksQ0FBQyxTQUFMLENBQWUsT0FBZixDQUFaO0FBQ0Y7O2VBRWM7QUFDWixFQUFBLElBQUksRUFBSixJQURZO0FBRVosRUFBQSxtQkFBbUIsRUFBbkIsbUJBRlk7QUFHWixFQUFBLHNCQUFzQixFQUF0QixzQkFIWTtBQUlaLEVBQUEsV0FBVyxFQUFYO0FBSlksQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBzb2NrZXQgZnJvbSAnLi93cy1jbGllbnQnO1xyXG5cclxuY2xhc3MgQ2hhdEFwcCB7XHJcbiAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICBzb2NrZXQuaW5pdCgnd3M6Ly9sb2NhbGhvc3Q6MzAwMScpO1xyXG5cclxuICAgICAgc29ja2V0LnJlZ2lzdGVyT3BlbkhhbmRsZXIoKCkgPT4ge1xyXG4gICAgICAgICBsZXQgbWVzc2FnZSA9IG5ldyBDaGF0TWVzc2FnZSh7bWVzc2FnZTogJ3BvdyEnIH0pO1xyXG4gICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UobWVzc2FnZS5zZXJpYWxpemUoKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBzb2NrZXQucmVnaXN0ZXJNZXNzYWdlSGFuZGxlcigoZGF0YSkgPT4ge1xyXG4gICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgfSk7XHJcbiAgIH1cclxufVxyXG5cclxuY2xhc3MgQ2hhdE1lc3NhZ2Uge1xyXG4gICBjb25zdHJ1Y3Rvcih7XHJcbiAgICAgIG1lc3NhZ2U6IG0sXHJcbiAgICAgIHVzZXI6IHUgPSAnYmF0bWFuJyxcclxuICAgICAgdGltZXN0YW1wOiB0ID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKVxyXG4gICB9KSB7XHJcbiAgICAgIHRoaXMubWVzc2FnZSA9IG07XHJcbiAgICAgIHRoaXMudXNlciA9IHU7XHJcbiAgICAgIHRoaXMudGltZXN0YW1wID0gdDtcclxuICAgfVxyXG4gICBzZXJpYWxpemUoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgIHVzZXI6IHRoaXMudXNlcixcclxuICAgICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxyXG4gICAgICAgICB0aW1lc3RhbXA6IHRoaXMudGltZXN0YW1wXHJcbiAgICAgIH07XHJcbiAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2hhdEFwcDtcclxuIiwiaW1wb3J0IENoYXRBcHAgZnJvbSAnLi9hcHAnO1xyXG5uZXcgQ2hhdEFwcCgpO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgc29ja2V0O1xyXG5cclxuZnVuY3Rpb24gaW5pdCh1cmwpIHtcclxuICAgc29ja2V0ID0gbmV3IFdlYlNvY2tldCh1cmwpO1xyXG4gICBjb25zb2xlLmxvZygnY29ubmVjdGluZy4uLicpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3Rlck9wZW5IYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xyXG4gICBzb2NrZXQub25vcGVuID0gKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnb3BlbicpO1xyXG4gICAgICBoYW5kbGVyRnVuY3Rpb24oKTtcclxuICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pIHtcclxuICAgY29uc29sZS5sb2coJ3JlZ2lzdGVyTWVzc2FnZUhhbmRsZXInKTtcclxuICAgc29ja2V0Lm9ubWVzc2FnZSA9IChlKSA9PiB7ICAgLy8gISDQvdC1INC+0LHRgNCw0LHQsNGC0YvQstCw0LXRgtGB0Y8g0YHQvtCx0YvRgtC40LUg0L/QvtC70YPRh9C10L3QuNGPINGB0L7QvtCx0YnQtdC90LjRj1xyXG4gICAgICBjb25zb2xlLmxvZygnbWVzc2FnZScsIGUuZGF0YSk7XHJcbiAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpO1xyXG4gICAgICBoYW5kbGVyRnVuY3Rpb24oZGF0YSk7XHJcbiAgIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbmRNZXNzYWdlKHBheWxvYWQpIHtcclxuICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgIGluaXQsXHJcbiAgIHJlZ2lzdGVyT3BlbkhhbmRsZXIsXHJcbiAgIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIsXHJcbiAgIHNlbmRNZXNzYWdlXHJcbn1cclxuIl19
