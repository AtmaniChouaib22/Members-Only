const passport = require("passport");
const router = require("express").Router();
const { register_user } = require("../Controllers/UserControllers");
const { post_msg } = require("../Controllers/MessageControllers");

//Post routes

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});

router.post("/register", register_user);

router.post("/newpost", post_msg);

module.exports = router;
