"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendNotification = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var handlebars = _interopRequireWildcard(require("handlebars"));

var fs = _interopRequireWildcard(require("fs"));

var path = _interopRequireWildcard(require("path"));

var transporter = _nodemailer["default"].createTransport({
  service: 'gmail',
  auth: {
    user: 'paul@adamhalasz.com',
    // generated ethereal user
    pass: 'BlueOcean21' // generated ethereal password

  }
});

var sendNotification = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email, event) {
    var tokenData,
        buttonText,
        buttonURL,
        message,
        filePath,
        source,
        template,
        replacements,
        htmlToSend,
        mailOptions,
        _filePath,
        _source,
        _template,
        _replacements,
        _htmlToSend,
        _mailOptions,
        _filePath2,
        _source2,
        _template2,
        _replacements2,
        _htmlToSend2,
        _mailOptions2,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tokenData = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;
            buttonText = _args.length > 3 && _args[3] !== undefined ? _args[3] : null;
            buttonURL = _args.length > 4 && _args[4] !== undefined ? _args[4] : null;
            message = _args.length > 5 && _args[5] !== undefined ? _args[5] : null;

            if (event === 'forgot password') {
              filePath = path.join(__dirname + '/views/forgotPassword.html');
              source = fs.readFileSync(filePath, 'utf-8').toString();
              template = handlebars.compile(source);
              replacements = {
                url: "".concat(buttonURL),
                button: "".concat(buttonText)
              };
              htmlToSend = template(replacements);
              mailOptions = {
                from: "paul@adamhalasz.com",
                // sender address
                to: "".concat(email),
                // list of receivers
                subject: 'Forgot Password',
                // Subject line
                text: 'The URL text',
                // plain text body
                html: htmlToSend
              };
              transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                  console.log('Error: ', err);
                } else {
                  console.log('Message sent');
                }
              });
            }

            if (event === 'password changed') {
              _filePath = path.join(__dirname + '/views/changedPassword.html');
              _source = fs.readFileSync(_filePath, 'utf-8').toString();
              _template = handlebars.compile(_source);
              _replacements = {
                url: "".concat(buttonURL),
                button: "".concat(buttonText)
              };
              _htmlToSend = _template(_replacements);
              _mailOptions = {
                from: "paul@adamhalasz.com",
                // sender address
                to: "".concat(email),
                // list of receivers
                subject: 'Password Changed',
                // Subject line
                text: 'The URL text',
                // plain text body
                html: _htmlToSend
              };
              transporter.sendMail(_mailOptions, function (err, info) {
                if (err) {
                  console.log('Error: ', err);
                } else {
                  console.log('Message sent');
                }
              });
            }

            if (event === 'upcoming event') {
              _filePath2 = path.join(__dirname + '/views/upcomingEvent.html');
              _source2 = fs.readFileSync(_filePath2, 'utf-8').toString();
              _template2 = handlebars.compile(_source2);
              _replacements2 = {
                url: "".concat(buttonURL),
                button: "".concat(buttonText),
                UpcomingEvent: "".concat(message)
              };
              _htmlToSend2 = _template2(_replacements2);
              _mailOptions2 = {
                from: "paul@adamhalasz.com",
                // sender address
                to: "".concat(email),
                // list of receivers
                subject: 'Custom event Invite',
                // Subject line
                text: 'The URL text',
                // plain text body
                html: _htmlToSend2
              };
              transporter.sendMail(_mailOptions2, function (err, info) {
                if (err) {
                  console.log('Error: ', err);
                } else {
                  console.log('Message sent');
                }
              });
            }

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendNotification(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.sendNotification = sendNotification;