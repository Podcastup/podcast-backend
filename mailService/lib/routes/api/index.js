"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _notifications = _interopRequireDefault(require("./notifications.route"));

var routes = (0, _express.Router)();
routes.use('/', _notifications["default"]);
var _default = routes;
exports["default"] = _default;