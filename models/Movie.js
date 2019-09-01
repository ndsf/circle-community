const { model, Schema } = require("mongoose");

const movieSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  director: [String],
  screenwriter: [String],
  starring: [String],
  type: [String],
  region: String,
  language: String,
  releaseDate: String,
  length: String,
  alias: String,
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

module.exports = model("Movie", movieSchema);
