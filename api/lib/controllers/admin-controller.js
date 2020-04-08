"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminController = exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _BaseController2 = _interopRequireDefault(require("../base/BaseController"));

var _helpers = require("../helpers");

var _services = require("../services");

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var accessToken;

var AdminController = /*#__PURE__*/function (_BaseController) {
  (0, _inherits2["default"])(AdminController, _BaseController);

  var _super = _createSuper(AdminController);

  function AdminController() {
    (0, _classCallCheck2["default"])(this, AdminController);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(AdminController, [{
    key: "loginUser",

    /**
     * @param  {Request} req
     * @param  {Response} res
     */
    value: function () {
      var _loginUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, email, password, admin, matchedPassword, payload, data;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, email = _req$body.email, password = _req$body.password;
                _context.next = 3;
                return this.service.findOne({
                  where: {
                    email: email
                  }
                }, false);

              case 3:
                admin = _context.sent;

                if (admin) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", _utils.HttpResponse.sendResponse(res, false, 400, "user with that email doesn't exist"));

              case 6:
                _context.next = 8;
                return _helpers.PasswordHelper.comparePassword(password, admin.password);

              case 8:
                matchedPassword = _context.sent;
                payload = {
                  email: admin.email,
                  uuid: admin.uuid,
                  id: admin.id
                };
                _context.t0 = _objectSpread;
                _context.t1 = {};
                _context.t2 = payload;
                _context.next = 15;
                return _helpers.TokenHelper.generateToken(payload);

              case 15:
                _context.t3 = _context.sent;
                _context.t4 = {
                  access_token: _context.t3
                };
                data = (0, _context.t0)(_context.t1, _context.t2, _context.t4);
                accessToken = data.access_token;
                return _context.abrupt("return", matchedPassword ? _utils.HttpResponse.sendResponse(res, true, 200, null, data) : _utils.HttpResponse.sendResponse(res, false, 400, "email and password don't match"));

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loginUser(_x, _x2) {
        return _loginUser.apply(this, arguments);
      }

      return loginUser;
    }()
  }, {
    key: "createRecord",
    value: function () {
      var _createRecord = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.service.findOne({
                  where: {
                    email: req.body.email
                  }
                });

              case 2:
                if (!_context2.sent) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", _utils.HttpResponse.sendErrorResponse(res, 409, "Admin with that email already exists", Error("Admin with that email already exists")));

              case 6:
                return _context2.abrupt("return", (0, _get2["default"])((0, _getPrototypeOf2["default"])(AdminController.prototype), "createRecord", this).call(this, req, res));

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createRecord(_x3, _x4) {
        return _createRecord.apply(this, arguments);
      }

      return createRecord;
    }()
  }, {
    key: "updateRecord",
    value: function () {
      var _updateRecord = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.service.findOne({
                  where: {
                    uuid: req.params.uuid
                  }
                });

              case 2:
                if (!_context3.sent) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", (0, _get2["default"])((0, _getPrototypeOf2["default"])(AdminController.prototype), "updateRecord", this).call(this, req, res));

              case 6:
                return _context3.abrupt("return", _utils.HttpResponse.sendErrorResponse(res, 404, "Admin user does not exist", Error("Admin user does not exist")));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function updateRecord(_x5, _x6) {
        return _updateRecord.apply(this, arguments);
      }

      return updateRecord;
    }()
  }, {
    key: "deleteRecord",
    value: function () {
      var _deleteRecord = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.service.findOne({
                  where: {
                    uuid: req.params.uuid
                  }
                });

              case 2:
                if (!_context4.sent) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt("return", (0, _get2["default"])((0, _getPrototypeOf2["default"])(AdminController.prototype), "deleteRecord", this).call(this, req, res));

              case 6:
                return _context4.abrupt("return", _utils.HttpResponse.sendErrorResponse(res, 404, "Admin user does not exist", Error("Admin user does not exist")));

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function deleteRecord(_x7, _x8) {
        return _deleteRecord.apply(this, arguments);
      }

      return deleteRecord;
    }()
  }, {
    key: "getCurrentUser",
    value: function () {
      var _getCurrentUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var decodedToken, data;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _helpers.TokenHelper.decodeToken(accessToken);

              case 2:
                decodedToken = _context5.sent;
                data = {
                  email: decodedToken.email,
                  uuid: decodedToken.uuid,
                  id: decodedToken.id
                };
                return _context5.abrupt("return", _utils.HttpResponse.sendResponse(res, true, 200, null, data));

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getCurrentUser(_x9, _x10) {
        return _getCurrentUser.apply(this, arguments);
      }

      return getCurrentUser;
    }()
  }]);
  return AdminController;
}(_BaseController2["default"]);

exports["default"] = AdminController;
var adminController = new AdminController(_services.adminService, "Admin");
exports.adminController = adminController;