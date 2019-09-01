const { model, Schema } = require("mongoose");

const bookSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  author: [String],
  pub: String,
  yearOfPub: String,
  pages: String,
  price: String,
  ISBN: String,
  bio: String,
  avatar: String,
  ratingOverall: Number,
  comments: [
    {
      title: String,
      body: String,
      username: String,
      createdAt: String
    }
  ],
  ratings: [
    {
      rating: Number,
      username: String,
      createdAt: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = model("Book", bookSchema);
