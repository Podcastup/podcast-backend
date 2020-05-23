"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var bcrypt = _interopRequireWildcard(require("bcryptjs"));

var saltRounds = 10;

var PasswordHelper = /*#__PURE__*/function () {
  function PasswordHelper() {
    (0, _classCallCheck2["default"])(this, PasswordHelper);
  }

  (0, _createClass2["default"])(PasswordHelper, null, [{
    key: "hashPassword",

    /**
     * @param  {string} plainPassword
     * @returns Promise
     */
    value: function () {
      var _hashPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(plainPassword) {
        var hashed;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return bcrypt.hash(plainPassword, saltRounds);

              case 2:
                hashed = _context.sent;
                return _context.abrupt("return", hashed);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function hashPassword(_x) {
        return _hashPassword.apply(this, arguments);
      }

      return hashPassword;
    }()
    /**
     * @param  {string} plainPassword
     * @param  {string} hashedPassword
     * @returns Promise
     */

  }, {
    key: "comparePassword",
    value: function () {
      var _comparePassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(plainPassword, hashedPassword) {
        var matchedPassword;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return bcrypt.compare(plainPassword, hashedPassword);

              case 2:
                matchedPassword = _context2.sent;
                return _context2.abrupt("return", matchedPassword);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function comparePassword(_x2, _x3) {
        return _comparePassword.apply(this, arguments);
      }

      return comparePassword;
    }()
  }]);
  return PasswordHelper;
}();

exports["default"] = PasswordHelper;