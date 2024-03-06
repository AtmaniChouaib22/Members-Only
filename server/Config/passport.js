const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../Models/UserSchema");
const { validatePassword } = require("../Utils/passwordUtils");

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

function verifyCallback(email, password, done) {
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      const isValid = validatePassword(password, user.hash, user.salt);
      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
}

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

//this function decide which information is stored inside the session(user Id in this case)
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//this function is used to retrieve the user information from the session
passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
