"use strict";

var _services = require("../services");

var JwtStrategy = require('passport-jwt').Strategy;

var ExtractJwt = require('passport-jwt').ExtractJwt;

var keys = process.env;
var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.JWT_SECRET
};

module.exports = function (passport) {
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    _services.adminService.findOne(jwt_payload.id).then(function (user) {
      if (user) {
        return done(null, user);
      }

      return done(null, false);
    })["catch"](function (err) {
      return console.log(err);
    });
  }));
};