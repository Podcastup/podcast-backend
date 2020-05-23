"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _tokenHelper = _interopRequireDefault(require("../helpers/token-helper"));

var _sendNotification = require("../helpers/sendNotification");

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var NotificationsController = /*#__PURE__*/function () {
  function NotificationsController() {
    (0, _classCallCheck2["default"])(this, NotificationsController);
  }

  (0, _createClass2["default"])(NotificationsController, null, [{
    key: "sendNotifications",

    /**
     * @param  {Request} req
     * @param  {Response} res
     */
    value: function () {
      var _sendNotifications = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var accessTokens, _iterator, _step, token, decoded;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                accessTokens = req.body.data;
                _iterator = _createForOfIteratorHelper(accessTokens);
                _context.prev = 2;

                _iterator.s();

              case 4:
                if ((_step = _iterator.n()).done) {
                  _context.next = 14;
                  break;
                }

                token = _step.value;
                _context.next = 8;
                return _tokenHelper["default"].decodeToken(token);

              case 8:
                decoded = _context.sent;
                console.log(decoded);
                _context.next = 12;
                return (0, _sendNotification.sendNotification)(decoded.user, decoded.event, token, decoded.buttonText, decoded.buttonLink, decoded.message);

              case 12:
                _context.next = 4;
                break;

              case 14:
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](2);

                _iterator.e(_context.t0);

              case 19:
                _context.prev = 19;

                _iterator.f();

                return _context.finish(19);

              case 22:
                return _context.abrupt("return", res.status(201).send({
                  message: "The notification sent"
                }));

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 16, 19, 22]]);
      }));

      function sendNotifications(_x, _x2) {
        return _sendNotifications.apply(this, arguments);
      }

      return sendNotifications;
    }()
  }]);
  return NotificationsController;
}();

var _default = NotificationsController;
exports["default"] = _default;