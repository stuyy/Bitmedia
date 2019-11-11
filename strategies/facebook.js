require('dotenv').config();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const User = require('../models/User');

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/facebook/callback",
    profileFields: ['id', 'displayName', 'picture.type(large)', 'email', 'gender']
  },
  async function(accessToken, refreshToken, profile, done) {
    console.log(profile);
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
