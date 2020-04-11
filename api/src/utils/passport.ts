
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
import {adminService} from "../services";

const keys = process.env;

const opts = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.JWT_SECRET
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            adminService.findOne(jwt_payload.id).then(user =>{
                if(user){
                    return done(null, user);
                }
                return done(null, false);
            })
                .catch(err => console.log(err));

        })
    );
};