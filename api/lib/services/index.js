"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AdminService", {
  enumerable: true,
  get: function get() {
    return _adminService["default"];
  }
});
Object.defineProperty(exports, "adminService", {
  enumerable: true,
  get: function get() {
    return _adminService.adminService;
  }
});
Object.defineProperty(exports, "UserService", {
  enumerable: true,
  get: function get() {
    return _userService["default"];
  }
});
Object.defineProperty(exports, "userService", {
  enumerable: true,
  get: function get() {
    return _userService.userService;
  }
});

var _adminService = _interopRequireWildcard(require("./admin-service"));

var _userService = _interopRequireWildcard(require("./user-service"));