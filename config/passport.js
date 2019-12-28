const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    // Payload includes items specified earlier
    User.findById(jwt_payload.id)
      .then((user) => {
        if (user) {
          // Return user to frontend
          return done(null, user);
        }

        // Return false since no user
        return done(null, false);
      })
      .catch((err) => console.log(err));
  }));
};