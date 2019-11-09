require('dotenv').config();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.PORT}/google/callback`
  },
  async function(token, tokenSecret, profile, done) {
    let email = profile.emails.shift().value;
    let displayName = profile.displayName;
    let firstName = displayName.substr(0, displayName.indexOf(' '));
    let lastName = displayName.substr(displayName.indexOf(' ') + 1);
    let user = await User.findOne({ where: { email: email }});
    if(user) {
        done(null, user);
    } else {
        let newUser = await User.create({
            email,
            firstName,
            lastName
        });
        console.log("New user created.")
        done(null, newUser);
    }
  }
));