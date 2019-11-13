require('dotenv').config();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const GoogleUser = require('../models/UserModels/GoogleUser');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `/auth/google/redirect`
  },
  async function(token, tokenSecret, profile, done) {
    console.log(profile);
    let email = profile.emails.shift().value;
    let displayName = profile.displayName;
    let firstName = displayName.substr(0, displayName.indexOf(' '));
    let lastName = displayName.substr(displayName.indexOf(' ') + 1);
    
    try { // Find user by email address.
      let user = await User.findOne({ where: { email: email }});
      if(user) { // If found, serialize them.
        done(null, user);
      } else { // Else create a User, and a Google user.
          let newUser = await User.create({
              email,
              firstName,
              lastName
          });
          let newGoogleUser = await GoogleUser.create({
            email,
            googleId: profile.id,
            connected: 1
          });
          console.log("New user created.")
          done(null, newUser);
      }
    }
    catch(err) {
      console.log(err);
    }
  }
));
