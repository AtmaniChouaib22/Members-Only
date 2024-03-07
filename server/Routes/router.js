const passport = require("passport");
const router = require("express").Router();
const { register_user } = require("../Controllers/UserControllers");
const { post_msg, get_allmsgs, delete_msg } = require("../Controllers/MessageControllers");
const { isAuth, isAdmin } = require("./authMiddleware");

//Post routes

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.redirect("/dashboard");
});

router.post("/register", register_user);

router.post("/newpost", isAuth, post_msg);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

//Get routes

router.get("/", get_allmsgs);

router.get("/dashboard", isAuth, get_allmsgs);

router.get("/login", (req, res, next) => {
  const form =
    '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="email">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
});

router.delete("/messages/:id", isAdmin, delete_msg);
module.exports = router;
