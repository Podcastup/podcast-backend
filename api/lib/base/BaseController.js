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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _utils = require("../utils");

var BaseController = /*#__PURE__*/function () {
  /**
   * @param {IService<any>} service
   * @param {string} modelName
   */
  function BaseController(service, modelName) {
    (0, _classCallCheck2["default"])(this, BaseController);
    (0, _defineProperty2["default"])(this, "service", void 0);
    (0, _defineProperty2["default"])(this, "modelName", void 0);
    this.service = service;
    this.modelName = modelName;
  }
  /**
   * @param {Request} req
   * @param {Response} res
   * @returns {response}
   */


  (0, _createClass2["default"])(BaseController, [{
    key: "createRecord",
    value: function () {
      var _createRecord = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var body, data;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                body = req.body;
                _context.next = 3;
                return this.service.createOne(body);

              case 3:
                data = _context.sent;
                return _context.abrupt("return", res.status(201).json({
                  data: data,
                  message: "".concat(this.modelName, " created successfully"),
                  success: true
                }));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createRecord(_x, _x2) {
        return _createRecord.apply(this, arguments);
      }

      return createRecord;
    }()
    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {response}
     */

  }, {
    key: "findAllRecords",
    value: function () {
      var _findAllRecords = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var data;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.service.findAll();

              case 2:
                data = _context2.sent;
                return _context2.abrupt("return", _utils.HttpResponse.sendResponse(res, true, 200, null, data));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function findAllRecords(_x3, _x4) {
        return _findAllRecords.apply(this, arguments);
      }

      return findAllRecords;
    }()
    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {response}
     */

  }, {
    key: "deleteRecord",
    value: function () {
      var _deleteRecord = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var uuid, options;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                uuid = req.params.uuid;
                options = {
                  where: {
                    uuid: uuid
                  }
                };
                _context3.next = 4;
                return this.service.deleteOne(options);

              case 4:
                return _context3.abrupt("return", res.status(201).send({
                  message: "".concat(this.modelName, " deleted successfully"),
                  success: false
                }));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function deleteRecord(_x5, _x6) {
        return _deleteRecord.apply(this, arguments);
      }

      return deleteRecord;
    }()
    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {response}
     */

  }, {
    key: "findOneRecord",
    value: function () {
      var _findOneRecord = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var uuid, body, options, result;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                uuid = req.params.uuid, body = req.body;
                options = {
                  where: {
                    uuid: uuid
                  }
                };
                _context4.next = 4;
                return this.service.updateOne(body, options);

              case 4:
                result = _context4.sent;

                if (result) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", _utils.HttpResponse.sendResponse(res, false, 404, "".concat(this.modelName, " Not Found")));

              case 7:
                return _context4.abrupt("return", _utils.HttpResponse.sendResponse(res, true, 200, null, result));

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function findOneRecord(_x7, _x8) {
        return _findOneRecord.apply(this, arguments);
      }

      return findOneRecord;
    }()
    /**
     * @param {Request} req
     * @param {Response} res
     * @returns {response}
     */

  }, {
    key: "updateRecord",
    value: function () {
      var _updateRecord = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var uuid, body, options, result;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                uuid = req.params.uuid, body = req.body;
                options = {
                  where: {
                    uuid: uuid
                  }
                };
                _context5.next = 4;
                return this.service.updateOne(body, options);

              case 4:
                result = _context5.sent;
                return _context5.abrupt("return", res.status(201).json({
                  message: "".concat(this.modelName, " updated succesfully"),
                  success: true
                }));

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function updateRecord(_x9, _x10) {
        return _updateRecord.apply(this, arguments);
      }

      return updateRecord;
    }()
  }]);
  return BaseController;
}();

exports["default"] = BaseController;