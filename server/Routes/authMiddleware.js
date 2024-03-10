const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("user is authenticated from middleware");
    next();
  } else {
    res.status(401).json({ err: "you are unauthorized to visit this" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) {
    console.log("user is admin", req.user.admin);
    next();
  } else {
    res.status(401).json({ err: "you are unauthorized to visit admin page" });
  }
};
module.exports = { isAdmin, isAuth };
