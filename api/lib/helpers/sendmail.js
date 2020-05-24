"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendMail = exports.transporter = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var transporter = function transporter() {
  // create reusable transporter object using the default SMTP transport
  return _nodemailer["default"].createTransport({
    service: "gmail",
    auth: {
      user: 'paulnsereko8@gmail.com',
      // generated ethereal user
      pass: 'rasengan1408' // generated ethereal password

    }
  });
};

exports.transporter = transporter;

var sendMail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email, token) {
    var info;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return transporter().sendMail({
              from: "\"Grid \uD83D\uDC7B\" <".concat(email, ">"),
              // sender address
              to: "paulnsereko8@gmail.com",
              // list of receivers
              subject: "Login Url",
              // Subject line
              text: "The URL text",
              // plain text body
              html: "\n                <pre>Please see below your URL login link</pre>\n                <br>\n                <b>http://localhost:8000/user/login/".concat(token, "</b>\n            ") // html body

            });

          case 2:
            info = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendMail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.sendMail = sendMail;