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

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var keys = process.env;

var TokenHelper = /*#__PURE__*/function () {
  function TokenHelper() {
    (0, _classCallCheck2["default"])(this, TokenHelper);
  }

  (0, _createClass2["default"])(TokenHelper, null, [{
    key: "generateToken",

    /**
     * @param  {object} payload
     * @returns Promise
     */
    value: function () {
      var _generateToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(payload) {
        var signature, token;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                signature = {
                  algorithm: "HS256",
                  expiresIn: "30d"
                };
                token = _jsonwebtoken["default"].sign(payload, keys.JWT_SECRET, signature);
                return _context.abrupt("return", "".concat(token));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function generateToken(_x) {
        return _generateToken.apply(this, arguments);
      }

      return generateToken;
    }()
  }, {
    key: "decodeToken",
    value: function () {
      var _decodeToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(token) {
        var decoded;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _jsonwebtoken["default"].verify(token, keys.JWT_SECRET);

              case 2:
                decoded = _context2.sent;
                return _context2.abrupt("return", decoded);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function decodeToken(_x2) {
        return _decodeToken.apply(this, arguments);
      }

      return decodeToken;
    }()
  }]);
  return TokenHelper;
}();

exports["default"] = TokenHelper;