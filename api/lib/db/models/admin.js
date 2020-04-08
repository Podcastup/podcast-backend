"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Admin = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _sequelize = require("sequelize");

var _v = _interopRequireDefault(require("uuid/v4"));

var _ = require(".");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

// import {PasswordHelper} from "../../helpers";
var Admin = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(Admin, _Model);

  var _super = _createSuper(Admin);

  function Admin() {
    var _this;

    (0, _classCallCheck2["default"])(this, Admin);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "password", void 0);
    return _this;
  }

  return Admin;
}(_sequelize.Model);

exports.Admin = Admin;
Admin.init({
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: _sequelize.DataTypes.INTEGER
  },
  uuid: {
    defaultValue: function defaultValue() {
      return (0, _v["default"])();
    },
    type: _sequelize.DataTypes.UUID
  },
  email: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING,
    validate: {
      isEmail: {
        msg: "Email is required"
      }
    }
  },
  password: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING,
    validate: {
      notNull: {
        msg: "A password must be provided"
      }
    }
  },
  firstName: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING,
    validate: {
      notNull: {
        msg: "A first name must be provided"
      }
    }
  },
  lastName: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING,
    validate: {
      notNull: {
        msg: "A last name must be provided"
      }
    }
  },
  createdAt: {
    type: _sequelize.DataTypes.DATE
  },
  updatedAt: {
    type: _sequelize.DataTypes.DATE
  }
}, {
  tableName: "Admins",
  sequelize: _.db.sequelize
});
Admin.beforeCreate( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(admin, options) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return PasswordHelper.hashPassword(admin.password);

          case 2:
            admin.password = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
Admin.sync();