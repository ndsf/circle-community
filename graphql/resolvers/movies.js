const {
  AuthenticationError,
  UserInputError
} = require("apollo-server-express");

const Movie = require("../../models/Movie");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    getMovies: async () => {
      try {
        const movies = await Movie.find().sort({ createdAt: -1 });
        return movies;
      } catch (err) {
        throw new Error(err);
      }
    },
    getMovie: async (_, { movieId }) => {
      try {
        const movie = await Movie.findById(movieId);
        if (movie) {
          return movie;
        } else {
          throw new UserInputError("Movie not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    getMoviesByBody: async (_, { keyword }) => {
      try {
        const movies = await Movie.find({
          body: { $regex: keyword, $options: "i" }
        });
        return movies;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    createMovie: async (
      _,
      {
        body,
        director,
        screenwriter,
        starring,
        type,
        region,
        language,
        releaseDate,
        length,
        alias,
        bio,
        avatar
      },
      context
    ) => {
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new Error("Movie body must not be empty");
      }

      director = director.split(",");
      screenwriter = screenwriter.split(",");
      starring = starring.split(",");
      type = type.split(",");

      const newMovie = new Movie({
        body: body,
        username: user.username,
        createdAt: new Date().toISOString(),
        director: director,
        screenwriter: screenwriter,
        starring: starring,
        type: type,
        region: region,
        language: language,
        releaseDate: releaseDate,
        length: length,
        alias: alias,
        user: user.id,
        bio: bio,
        avatar: avatar,
        ratingOverall: 0
      });

      const movie = await newMovie.save();

      context.pubsub.publish("NEW_MOVIE", {
        newMovie: movie
      });

      return movie;
    },
    deleteMovie: async (_, { movieId }, context) => {
      const user = checkAuth(context);

      try {
        const movie = await Movie.findById(movieId);
        if (user.username === movie.username) {
          await movie.delete();
          return "Movie deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    rateMovie: async (_, { rating, movieId }, context) => {
      const { username } = checkAuth(context);

      if (rating > 5) rating = 5;
      if (rating < 1) rating = 1;

      const movie = await Movie.findById(movieId);

      if (movie) {
        const userRate = movie.ratings.find(rate => rate.username === username);
        if (userRate) {
          // Movie already rated, unrate it
          movie.ratingOverall = movie.ratingOverall - userRate.rating;
          movie.ratings = movie.ratings.filter(
            rate => rate.username !== username
          );
        } else {
          // Not rated, rate movie
          movie.ratingOverall = movie.ratingOverall + rating;
          movie.ratings.push({
            rating,
            username,
            createdAt: new Date().toISOString()
          });
        }

        await movie.save();
        return movie;
      } else throw new UserInputError("Movie not found");
    },
    createMovieComment: async (_, { movieId, title, body }, context) => {
      const { username } = checkAuth(context);

      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not empty"
          }
        });
      }

      const movie = await Movie.findById(movieId);

      if (movie) {
        movie.comments.unshift({
          title,
          body,
          username,
          createdAt: new Date().toISOString()
        });

        await movie.save();
        return movie;
      } else throw new UserInputError("Movie not found");
    },
    deleteMovieComment: async (_, { movieId, commentId }, context) => {
      const { username } = checkAuth(context);

      const movie = await Movie.findById(movieId);

      if (movie) {
        const commentIndex = movie.comments.findIndex(c => c.id === commentId);

        comment = movie.comments[commentIndex];
        if (comment && comment.username === username) {
          movie.comments.splice(commentIndex, 1);
          await movie.save();

          return movie;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Movie not found");
      }
    }
  },
  Subscription: {
    newMovie: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_MOVIE")
    }
  }
};
