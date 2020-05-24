"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notifications = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _sequelize = require("sequelize");

var _v = _interopRequireDefault(require("uuid/v4"));

var _ = require(".");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Notifications = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(Notifications, _Model);

  var _super = _createSuper(Notifications);

  function Notifications() {
    (0, _classCallCheck2["default"])(this, Notifications);
    return _super.apply(this, arguments);
  }

  return Notifications;
}(_sequelize.Model);

exports.Notifications = Notifications;
Notifications.init({
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
  userId: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING
  },
  event: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING,
    validate: {
      isEmail: {
        msg: "Event is required"
      }
    }
  },
  message: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING,
    validate: {
      isEmail: {
        msg: "Message is required"
      }
    }
  },
  buttonLink: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING,
    validate: {
      isEmail: {
        msg: "Button Link is required"
      }
    }
  },
  buttonText: {
    allowNull: false,
    type: _sequelize.DataTypes.STRING,
    validate: {
      isEmail: {
        msg: "Button Text is required"
      }
    }
  }
}, {
  tableName: "Notifications",
  sequelize: _.db.sequelize
});
Notifications.beforeCreate(function (notifications, options) {});
Notifications.sync();