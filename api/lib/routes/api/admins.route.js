"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _celebrate4 = require("celebrate");

var _express = require("express");

var _passport = _interopRequireDefault(require("passport"));

var _adminController = require("../../controllers/admin-controller");

var router = (0, _express.Router)();
router.post("/admin/login", (0, _celebrate4.celebrate)((0, _defineProperty2["default"])({}, _celebrate4.Segments.BODY, _celebrate4.Joi.object().keys({
  email: _celebrate4.Joi.string().required().email(),
  password: _celebrate4.Joi.string().required()
}))), function (req, res, next) {
  return _adminController.adminController.loginUser(req, res);
});
router.post("/admin/logout", _passport["default"].authenticate('jwt', {
  session: false
}, null), function (req, res, next) {
  return _adminController.adminController.logoutUser(req, res);
});
router.post("/admin", (0, _celebrate4.celebrate)((0, _defineProperty2["default"])({}, _celebrate4.Segments.BODY, _celebrate4.Joi.object().keys({
  email: _celebrate4.Joi.string().required().email(),
  password: _celebrate4.Joi.string().required(),
  firstName: _celebrate4.Joi.string().required(),
  lastName: _celebrate4.Joi.string().required()
}))), function (req, res, next) {
  return _adminController.adminController.createRecord(req, res);
});
router.post("/admin/forgotPassword", (0, _celebrate4.celebrate)((0, _defineProperty2["default"])({}, _celebrate4.Segments.BODY, _celebrate4.Joi.object().keys({
  email: _celebrate4.Joi.string().required().email(),
  buttonLink: _celebrate4.Joi.string().required(),
  buttonText: _celebrate4.Joi.string().required()
}))), function (req, res, next) {
  return _adminController.adminController.forgotPassword(req, res, next);
});
router.get("/admin", function (req, res, next) {
  return _adminController.adminController.findAllRecords(req, res);
});
router["delete"]("/admin/:id", _passport["default"].authenticate('jwt', {
  session: false
}, null), function (req, res, next) {
  return _adminController.adminController.deleteRecord(req, res);
});
router.put("/admin/:id", _passport["default"].authenticate('jwt', {
  session: false
}, null), function (req, res, next) {
  return _adminController.adminController.updateRecord(req, res);
});
router.get("/admin/me", _passport["default"].authenticate('jwt', {
  session: false
}, null), function (req, res, next) {
  return _adminController.adminController.getCurrentUser(req, res);
});
var _default = router;
exports["default"] = _default;