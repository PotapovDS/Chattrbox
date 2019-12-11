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

  _wsClient["default"].registerCloseHandler(function () {
    console.log('connection close');
    setTimeout(function () {
      console.log('attempt to connect');

      _wsClient["default"].init('wss://localhost:3002');
    }, 3000);
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

function registerCloseHandler(handlerFunction) {
  socket.onclose = function (e) {
    console.log(e);
    handlerFunction();
  };
}

var _default = {
  init: init,
  registerOpenHandler: registerOpenHandler,
  registerMessageHandler: registerMessageHandler,
  sendMessage: sendMessage,
  registerCloseHandler: registerCloseHandler
};
exports["default"] = _default;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvYXBwLmpzIiwiYXBwL3NjcmlwdHMvc3JjL21haW4uanMiLCJhcHAvc2NyaXB0cy9zcmMvd3MtY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7Ozs7QUFFQTs7Ozs7Ozs7OztJQUVNLE8sR0FDSCxtQkFBYztBQUFBOztBQUNYLHVCQUFPLElBQVAsQ0FBWSxxQkFBWjs7QUFFQSx1QkFBTyxtQkFBUCxDQUEyQixZQUFNO0FBQzlCLFFBQUksT0FBTyxHQUFHLElBQUksV0FBSixDQUFnQjtBQUMzQixNQUFBLE9BQU8sRUFBRTtBQURrQixLQUFoQixDQUFkOztBQUdBLHlCQUFPLFdBQVAsQ0FBbUIsT0FBTyxDQUFDLFNBQVIsRUFBbkI7QUFDRixHQUxEOztBQU1BLHVCQUFPLHNCQUFQLENBQThCLFVBQUMsSUFBRCxFQUFVO0FBQ3JDLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0YsR0FGRDs7QUFHQSx1QkFBTyxvQkFBUCxDQUE0QixZQUFNO0FBQy9CLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxrQkFBWjtBQUNBLElBQUEsVUFBVSxDQUFDLFlBQU07QUFDZCxNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksb0JBQVo7O0FBQ0EsMkJBQU8sSUFBUCxDQUFZLHNCQUFaO0FBQ0YsS0FIUyxFQUdQLElBSE8sQ0FBVjtBQUlGLEdBTkQ7QUFPRixDOztJQUdFLFc7OztBQUNILDZCQUlHO0FBQUEsUUFIUyxDQUdULFFBSEEsT0FHQTtBQUFBLHlCQUZBLElBRUE7QUFBQSxRQUZNLENBRU4sMEJBRlUsUUFFVjtBQUFBLDhCQURBLFNBQ0E7QUFBQSxRQURXLENBQ1gsK0JBRGdCLElBQUksSUFBSixFQUFELENBQWEsT0FBYixFQUNmOztBQUFBOztBQUNBLFNBQUssT0FBTCxHQUFlLENBQWY7QUFDQSxTQUFLLElBQUwsR0FBWSxDQUFaO0FBQ0EsU0FBSyxTQUFMLEdBQWlCLENBQWpCO0FBQ0Y7Ozs7Z0NBQ1c7QUFDVCxhQUFPO0FBQ0osUUFBQSxJQUFJLEVBQUUsS0FBSyxJQURQO0FBRUosUUFBQSxPQUFPLEVBQUUsS0FBSyxPQUZWO0FBR0osUUFBQSxTQUFTLEVBQUUsS0FBSztBQUhaLE9BQVA7QUFLRjs7Ozs7O2VBR1csTzs7Ozs7O0FDOUNmOzs7O0FBQ0EsSUFBSSxlQUFKOzs7QUNEQTs7Ozs7O0FBRUEsSUFBSSxNQUFKOztBQUVBLFNBQVMsSUFBVCxDQUFjLEdBQWQsRUFBbUI7QUFDaEIsRUFBQSxNQUFNLEdBQUcsSUFBSSxTQUFKLENBQWMsR0FBZCxDQUFUO0FBQ0EsRUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGVBQVo7QUFDRjs7QUFFRCxTQUFTLG1CQUFULENBQTZCLGVBQTdCLEVBQThDO0FBQzNDLEVBQUEsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsWUFBTTtBQUNuQixJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksTUFBWjtBQUNBLElBQUEsZUFBZTtBQUNqQixHQUhEO0FBSUY7O0FBRUQsU0FBUyxzQkFBVCxDQUFnQyxlQUFoQyxFQUFpRDtBQUM5QyxFQUFBLE1BQU0sQ0FBQyxTQUFQLEdBQW1CLFVBQUMsQ0FBRCxFQUFPO0FBQUk7QUFDM0IsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFNBQVosRUFBdUIsQ0FBQyxDQUFDLElBQXpCO0FBQ0EsUUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUwsQ0FBVyxDQUFDLENBQUMsSUFBYixDQUFYO0FBQ0EsSUFBQSxlQUFlLENBQUMsSUFBRCxDQUFmO0FBQ0YsR0FKRDtBQUtGOztBQUVELFNBQVMsV0FBVCxDQUFxQixPQUFyQixFQUE4QjtBQUMzQixFQUFBLE1BQU0sQ0FBQyxJQUFQLENBQVksSUFBSSxDQUFDLFNBQUwsQ0FBZSxPQUFmLENBQVo7QUFDRjs7QUFFRCxTQUFTLG9CQUFULENBQThCLGVBQTlCLEVBQStDO0FBQzVDLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsVUFBQyxDQUFELEVBQU87QUFDckIsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLENBQVo7QUFDQSxJQUFBLGVBQWU7QUFDakIsR0FIRDtBQUlGOztlQUVjO0FBQ1osRUFBQSxJQUFJLEVBQUosSUFEWTtBQUVaLEVBQUEsbUJBQW1CLEVBQW5CLG1CQUZZO0FBR1osRUFBQSxzQkFBc0IsRUFBdEIsc0JBSFk7QUFJWixFQUFBLFdBQVcsRUFBWCxXQUpZO0FBS1osRUFBQSxvQkFBb0IsRUFBcEI7QUFMWSxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHNvY2tldCBmcm9tICcuL3dzLWNsaWVudCc7XHJcblxyXG5jbGFzcyBDaGF0QXBwIHtcclxuICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgIHNvY2tldC5pbml0KCd3czovL2xvY2FsaG9zdDozMDAxJyk7XHJcblxyXG4gICAgICBzb2NrZXQucmVnaXN0ZXJPcGVuSGFuZGxlcigoKSA9PiB7XHJcbiAgICAgICAgIGxldCBtZXNzYWdlID0gbmV3IENoYXRNZXNzYWdlKHtcclxuICAgICAgICAgICAgbWVzc2FnZTogJ3BvdyEnXHJcbiAgICAgICAgIH0pO1xyXG4gICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UobWVzc2FnZS5zZXJpYWxpemUoKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBzb2NrZXQucmVnaXN0ZXJNZXNzYWdlSGFuZGxlcigoZGF0YSkgPT4ge1xyXG4gICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHNvY2tldC5yZWdpc3RlckNsb3NlSGFuZGxlcigoKSA9PiB7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKCdjb25uZWN0aW9uIGNsb3NlJyk7XHJcbiAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYXR0ZW1wdCB0byBjb25uZWN0Jyk7XHJcbiAgICAgICAgICAgIHNvY2tldC5pbml0KCd3c3M6Ly9sb2NhbGhvc3Q6MzAwMicpO1xyXG4gICAgICAgICB9LCAzMDAwKTtcclxuICAgICAgfSk7XHJcbiAgIH1cclxufVxyXG5cclxuY2xhc3MgQ2hhdE1lc3NhZ2Uge1xyXG4gICBjb25zdHJ1Y3Rvcih7XHJcbiAgICAgIG1lc3NhZ2U6IG0sXHJcbiAgICAgIHVzZXI6IHUgPSAnYmF0bWFuJyxcclxuICAgICAgdGltZXN0YW1wOiB0ID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKVxyXG4gICB9KSB7XHJcbiAgICAgIHRoaXMubWVzc2FnZSA9IG07XHJcbiAgICAgIHRoaXMudXNlciA9IHU7XHJcbiAgICAgIHRoaXMudGltZXN0YW1wID0gdDtcclxuICAgfVxyXG4gICBzZXJpYWxpemUoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgIHVzZXI6IHRoaXMudXNlcixcclxuICAgICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxyXG4gICAgICAgICB0aW1lc3RhbXA6IHRoaXMudGltZXN0YW1wXHJcbiAgICAgIH07XHJcbiAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2hhdEFwcDtcclxuIiwiaW1wb3J0IENoYXRBcHAgZnJvbSAnLi9hcHAnO1xyXG5uZXcgQ2hhdEFwcCgpO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgc29ja2V0O1xyXG5cclxuZnVuY3Rpb24gaW5pdCh1cmwpIHtcclxuICAgc29ja2V0ID0gbmV3IFdlYlNvY2tldCh1cmwpO1xyXG4gICBjb25zb2xlLmxvZygnY29ubmVjdGluZy4uLicpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3Rlck9wZW5IYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xyXG4gICBzb2NrZXQub25vcGVuID0gKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnb3BlbicpO1xyXG4gICAgICBoYW5kbGVyRnVuY3Rpb24oKTtcclxuICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pIHtcclxuICAgc29ja2V0Lm9ubWVzc2FnZSA9IChlKSA9PiB7ICAgLy8gISDQvdC1INC+0LHRgNCw0LHQsNGC0YvQstCw0LXRgtGB0Y8g0YHQvtCx0YvRgtC40LUg0L/QvtC70YPRh9C10L3QuNGPINGB0L7QvtCx0YnQtdC90LjRj1xyXG4gICAgICBjb25zb2xlLmxvZygnbWVzc2FnZScsIGUuZGF0YSk7XHJcbiAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpO1xyXG4gICAgICBoYW5kbGVyRnVuY3Rpb24oZGF0YSk7XHJcbiAgIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbmRNZXNzYWdlKHBheWxvYWQpIHtcclxuICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3RlckNsb3NlSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pIHtcclxuICAgc29ja2V0Lm9uY2xvc2UgPSAoZSkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgaGFuZGxlckZ1bmN0aW9uKCk7XHJcbiAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgaW5pdCxcclxuICAgcmVnaXN0ZXJPcGVuSGFuZGxlcixcclxuICAgcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcixcclxuICAgc2VuZE1lc3NhZ2UsXHJcbiAgIHJlZ2lzdGVyQ2xvc2VIYW5kbGVyXHJcbn1cclxuIl19
