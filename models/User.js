const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
  bio: { type: String, default: "" }
});

module.exports = model("User", userSchema);
