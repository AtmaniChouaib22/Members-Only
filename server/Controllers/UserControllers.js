const User = require("../Models/UserSchema");
const { genPassword, ValidateAdminRegistration } = require("../Utils/passwordUtils");
require("dotenv").config();

//Post routes

const register_user = async (req, res, next) => {
  const { first_name, last_name, email, password, admin, adminPass } = req.body;
  const adminChecked = ValidateAdminRegistration(adminPass);
  console.log("check admin", adminChecked);
  //if the user is admin with wrong password
  if (admin === "true" && adminChecked === false) {
    const error = new Error("failed to register as an Admin wrong password");
    next(error);
  }
  //if the user is admin with correct password
  else if (admin === "true" && adminChecked === true) {
    const { salt, hash } = genPassword(password);
    const newUser = new User({ first_name, last_name, email, salt, hash, admin, member: true });
    newUser
      .save()
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch((error) => {
        next(error);
      });
  }
  //if user is not admin (regular user)
  else {
    const { salt, hash } = genPassword(password);
    const newUser = new User({ first_name, last_name, email, salt, hash, admin: false, member: false });

    newUser
      .save()
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .then((error) => {
        next(error);
      });
  }
};

const set_member = (req, res, next) => {
  const { secret_pass } = req.body;
  console.log(req.user);
  const email = req.user.email;
  console.log("email", email);
  if (secret_pass !== process.env.SECRET_PASS) {
    console.log("wrong password for membership");
    const error = new Error("failed to register as a member wrong password");
    next(error);
  } else {
    User.findOneAndUpdate({ email }, { member: true }, { new: true })
      .then((user) => {
        console.log("membership user", user);
        res.status(200).json(user);
      })
      .catch((error) => {
        next(error);
      });
  }
};

module.exports = { register_user, set_member };
