"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var BaseService = /*#__PURE__*/function () {
  /**
   * @param  {Model} model
   * @param excludedFields
   */
  function BaseService(model, excludedFields) {
    (0, _classCallCheck2["default"])(this, BaseService);
    (0, _defineProperty2["default"])(this, "model", void 0);
    (0, _defineProperty2["default"])(this, "excludedFields", void 0);
    this.model = model;
    this.excludedFields = excludedFields;
  }
  /**
   * @param  {T} data
   * @param options
   * @returns Promise
   */


  (0, _createClass2["default"])(BaseService, [{
    key: "createOne",
    value: function () {
      var _createOne = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data, options) {
        var result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.model.create(_objectSpread({}, data, {}, options));

              case 2:
                result = _context.sent;
                return _context.abrupt("return", result);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createOne(_x, _x2) {
        return _createOne.apply(this, arguments);
      }

      return createOne;
    }()
    /**
     * @returns Promise
     * @param options
     * @param exclude
     */

  }, {
    key: "findAll",
    value: function () {
      var _findAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(options, exclude) {
        var result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.model.findAll(_objectSpread({}, options, {
                  attributes: {
                    exclude: exclude && (0, _toConsumableArray2["default"])(this.excludedFields)
                  }
                }));

              case 2:
                result = _context2.sent;
                return _context2.abrupt("return", result);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function findAll(_x3, _x4) {
        return _findAll.apply(this, arguments);
      }

      return findAll;
    }()
    /**
     * @returns Promise
     * @param options
     * @param exclude
     */

  }, {
    key: "findOne",
    value: function () {
      var _findOne = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(options, exclude) {
        var result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.model.findOne(_objectSpread({}, options, {
                  attributes: {
                    exclude: exclude && (0, _toConsumableArray2["default"])(this.excludedFields)
                  }
                }));

              case 2:
                result = _context3.sent;
                return _context3.abrupt("return", result);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function findOne(_x5, _x6) {
        return _findOne.apply(this, arguments);
      }

      return findOne;
    }()
    /**
     * @returns Promise
     * @param options
     */

  }, {
    key: "deleteOne",
    value: function () {
      var _deleteOne = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(options) {
        var result;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.model.destroy(_objectSpread({}, options));

              case 2:
                result = _context4.sent;
                return _context4.abrupt("return", result);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function deleteOne(_x7) {
        return _deleteOne.apply(this, arguments);
      }

      return deleteOne;
    }()
    /**
     * @param  {object} data
     * @param options
     * @returns Promise
     */

  }, {
    key: "updateOne",
    value: function () {
      var _updateOne = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(data, options) {
        var results;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.model.update(_objectSpread({}, data), _objectSpread({}, options));

              case 2:
                results = _context5.sent;
                return _context5.abrupt("return", results);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function updateOne(_x8, _x9) {
        return _updateOne.apply(this, arguments);
      }

      return updateOne;
    }()
    /**
     * @param  {object} options
     * @returns Promise
     */

  }, {
    key: "findOrCreate",
    value: function () {
      var _findOrCreate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(options) {
        var _yield$this$model$fin, _yield$this$model$fin2, result, dataValues, isNewRecord;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.model.findOrCreate(_objectSpread({}, options));

              case 2:
                _yield$this$model$fin = _context6.sent;
                _yield$this$model$fin2 = (0, _slicedToArray2["default"])(_yield$this$model$fin, 1);
                result = _yield$this$model$fin2[0];
                dataValues = result.dataValues, isNewRecord = result._options.isNewRecord;
                return _context6.abrupt("return", {
                  dataValues: dataValues,
                  isNewRecord: isNewRecord
                });

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function findOrCreate(_x10) {
        return _findOrCreate.apply(this, arguments);
      }

      return findOrCreate;
    }()
  }]);
  return BaseService;
}();

exports["default"] = BaseService;