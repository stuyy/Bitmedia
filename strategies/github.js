const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User')
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/github/callback',
  scope: ['user:email']
},
async function(accessToken, refreshToken, profile, done) {
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
}))
