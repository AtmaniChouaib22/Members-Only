const passport = require("passport");
const router = require("express").Router();
const { register_user, set_member } = require("../Controllers/UserControllers");
const { post_msg, get_allmsgs, delete_msg, get_allmsgs_protected } = require("../Controllers/MessageControllers");
const { isAuth, isAdmin } = require("./authMiddleware");

//Post routes

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log(req.user);
  console.log(req.session);
  res.json(req.user);
});

router.post("/register", register_user);

router.post("/newpost", isAuth, post_msg);

router.post("/logout", isAuth, function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    } else {
      res.status(200).json({ message: "logged out" });
    }
  });
});

//Get routes

router.get("/messages", get_allmsgs);

router.get("/protected", isAuth, get_allmsgs_protected);

router.patch("/member", isAuth, set_member);

router.delete("/messages/:id", isAdmin, delete_msg);
module.exports = router;
