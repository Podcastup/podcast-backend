"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _path = _interopRequireDefault(require("path"));

var _sequelize = require("sequelize");

var dotEnv = require("dotenv");

dotEnv.config();

var basename = _path["default"].basename(__filename);

var env = process.env.NODE_ENV || "development"; // import { databaseConfig as conf } from "../../config";
// ============================================================
// Connect to Template1 Database
// ============================================================

var PostgresInit = /*#__PURE__*/function () {
  function PostgresInit() {
    (0, _classCallCheck2["default"])(this, PostgresInit);
    (0, _defineProperty2["default"])(this, "db", void 0);
    var sequelizeInitURL = "postgres://".concat(process.env.POSTGRES_USER, ":").concat(process.env.POSTGRES_PASSWORD, "@").concat(process.env.POSTGRES_HOST, "/template1");
    this.db = new _sequelize.Sequelize(sequelizeInitURL);
  }

  (0, _createClass2["default"])(PostgresInit, [{
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var exists;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.databaseExists();

              case 2:
                exists = _context.sent;

                if (exists) {
                  _context.next = 6;
                  break;
                }

                _context.next = 6;
                return this.createDatabase();

              case 6:
                _context.next = 8;
                return this.grantAccess();

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "grantAccess",
    value: function () {
      var _grantAccess = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _this = this;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", new Promise(function (resolve, reject) {
                  var createUserQuery = "grant all privileges on database ".concat(process.env.POSTGRES_DATABASE, " to ").concat(process.env.POSTGRES_USER, ";");

                  _this.db.query(createUserQuery).then(function () {
                    console.log("PostgresInit: Priviledges granted on database [".concat(process.env.POSTGRES_DATABASE, "] for user [").concat(process.env.POSTGRES_USER, "]."));
                    resolve();
                  })["catch"](function (err) {
                    console.log("PostgresInit: grantAccess Error: Can't grant access to database: ", err);
                    reject(err);
                  });
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function grantAccess() {
        return _grantAccess.apply(this, arguments);
      }

      return grantAccess;
    }()
  }, {
    key: "createDatabase",
    value: function () {
      var _createDatabase = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var _this2 = this;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", new Promise(function (resolve, reject) {
                  var createQuery = "CREATE DATABASE ".concat(process.env.POSTGRES_DATABASE, " WITH OWNER = ").concat(process.env.POSTGRES_USER, " ENCODING = 'UTF8';");

                  _this2.db.query(createQuery).then(function () {
                    console.log("PostgresInit: Database [".concat(process.env.POSTGRES_DATABASE, "] created"));
                    resolve();
                  })["catch"](function (err) {
                    console.log("PostgresInit: createDatabase Error: Can't create database: ", err);
                    reject(err);
                  });
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createDatabase() {
        return _createDatabase.apply(this, arguments);
      }

      return createDatabase;
    }()
  }, {
    key: "databaseExists",
    value: function () {
      var _databaseExists = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var _this3 = this;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", new Promise(function (resolve, reject) {
                  var createQuery = "SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('".concat(process.env.POSTGRES_DATABASE, "');");

                  _this3.db.query(createQuery).then(function (result) {
                    var results = result[0];

                    if (results.length && results[0] && results[0].datname == process.env.POSTGRES_DATABASE) {
                      resolve(true);
                    } else {
                      resolve(false);
                    }
                  })["catch"](function (err) {
                    console.log("PostgresInit: Error: Can't create database: ", err);
                    reject(err);
                  });
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function databaseExists() {
        return _databaseExists.apply(this, arguments);
      }

      return databaseExists;
    }()
  }]);
  return PostgresInit;
}();

var pg = new PostgresInit();
pg.init(); // ============================================================
// Connect to Project Database
// ============================================================

var db = {
  sequelize: {},
  // tslint:disable-next-line:object-literal-sort-keys
  Sequelize: {}
};
exports.db = db;
db.sequelize = new _sequelize.Sequelize(process.env.DATABASE_URL);