"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Validator = /*#__PURE__*/function () {
  function Validator() {
    (0, _classCallCheck2["default"])(this, Validator);
  }

  (0, _createClass2["default"])(Validator, null, [{
    key: "validatePassword",

    /**
     * @param  {string} password
     * @returns {boolean}
     */
    value: function validatePassword(password) {
      var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

      if (strongRegex.test(password)) {
        return {
          strength: "strong",
          valid: true
        };
      } else if (mediumRegex.test(password)) {
        return {
          strength: "medium",
          valid: true
        };
      }

      return {
        strength: "weak",
        valid: false
      };
    }
  }, {
    key: "validateEmail",
    value: function validateEmail(email) {
      // tslint:disable-next-line:max-line-length
      var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegEx.test(String(email).toLowerCase());
    }
  }]);
  return Validator;
}();

exports["default"] = Validator;