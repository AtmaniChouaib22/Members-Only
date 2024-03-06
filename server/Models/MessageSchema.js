const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true, maxlength: 500 },
  },
  { timestamps: true }
);

const messages = mongoose.model("messages", MessageSchema);

module.exports = messages;
