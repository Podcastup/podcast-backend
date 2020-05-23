"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _notificationsController = _interopRequireDefault(require("../../controllers/notifications-controller"));

var router = (0, _express.Router)();
router.get('/notifications', function (req, res) {
  res.json({
    ok: true
  });
});
router.post('/notifications/sendNotification', _notificationsController["default"].sendNotifications);
var _default = router;
exports["default"] = _default;