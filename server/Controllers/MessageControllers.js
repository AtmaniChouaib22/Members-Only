const messages = require("../Models/MessageSchema");
const User = require("../Models/UserSchema");

//check if user is authorized to post a message
function messageAbility(user) {
  if (user.admin === "true" || user.member === "true") {
    return true;
  } else {
    return false;
  }
}

async function post_msg(req, res) {
  const { message } = req.body;
  const sender = req.user._id.toString();
  const user = await User.findById(sender).select("first_name last_name admin member");
  const msgAbility = messageAbility(user);

  if (msgAbility === true) {
    const newMessage = new messages({ user: sender, message });
    newMessage
      .save()
      .then((newMessage) => {
        res.status(201).json(newMessage);
      })
      .catch((error) => {
        next(error);
      });
  } else {
    res.status(401).json({ message: "You are not authorized to post a message" });
  }
}

module.exports = { post_msg };
