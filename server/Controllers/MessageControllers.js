const messages = require("../Models/MessageSchema");
const User = require("../Models/UserSchema");

//check if user is authorized to post a message
function messageAbility(user) {
  if (user.admin === true || user.member === true) {
    return true;
  } else {
    return false;
  }
}

//post a message
async function post_msg(req, res, next) {
  const { message } = req.body;
  const sender = req.user.id;
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

//get all messages
function get_allmsgs(req, res, next) {
  messages
    .find()
    .then((allmsgs) => {
      res.status(200).json(allmsgs);
    })
    .catch((error) => {
      next(error);
    });
}

function get_allmsgs_protected(req, res, next) {
  messages
    .find()
    .populate("user", "first_name last_name username createdAt admin member")
    .then((allmsgs) => {
      res.status(200).json(allmsgs);
    })
    .catch((error) => {
      next(error);
    });
}
//delete a message
function delete_msg(req, res, next) {
  const { id } = req.params;
  console.log("message id", id);
  messages
    .findByIdAndDelete(id)
    .then((deleted) => {
      res.status(200).json(deleted);
    })
    .catch((error) => {
      next(error);
    });
}

module.exports = { post_msg, get_allmsgs, delete_msg, get_allmsgs_protected };
