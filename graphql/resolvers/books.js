const {
  AuthenticationError,
  UserInputError
} = require("apollo-server-express");

const Book = require("../../models/Book");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    getBooks: async () => {
      try {
        const books = await Book.find().sort({ createdAt: -1 });
        return books;
      } catch (err) {
        throw new Error(err);
      }
    },
    getBook: async (_, { bookId }) => {
      try {
        const book = await Book.findById(bookId);
        if (book) {
          return book;
        } else {
          throw new UserInputError("Book not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    getBooksByBody: async (_, { keyword }) => {
      try {
        const books = await Book.find({
          body: { $regex: keyword, $options: "i" }
        });
        return books;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    createBook: async (
      _,
      { body, author, pub, yearOfPub, pages, price, ISBN, bio, avatar },
      context
    ) => {
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new Error("Book body must not be empty");
      }

      author = author.split(",");

      const newBook = new Book({
        body: body,
        username: user.username,
        createdAt: new Date().toISOString(),
        author: author,
        pub: pub,
        yearOfPub: yearOfPub,
        pages: pages,
        price: price,
        ISBN: ISBN,
        user: user.id,
        bio: bio,
        avatar: avatar,
        ratingOverall: 0
      });

      const book = await newBook.save();

      context.pubsub.publish("NEW_BOOK", {
        newBook: book
      });

      return book;
    },
    deleteBook: async (_, { bookId }, context) => {
      const user = checkAuth(context);

      try {
        const book = await Book.findById(bookId);
        if (user.username === book.username) {
          await book.delete();
          return "Book deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    rateBook: async (_, { rating, bookId }, context) => {
      const { username } = checkAuth(context);

      if (rating > 5) rating = 5;
      if (rating < 1) rating = 1;

      const book = await Book.findById(bookId);

      if (book) {
        const userRate = book.ratings.find(rate => rate.username === username);
        if (userRate) {
          // Book already rated, unrate it
          book.ratingOverall = book.ratingOverall - userRate.rating;
          book.ratings = book.ratings.filter(
            rate => rate.username !== username
          );
        } else {
          // Not rated, rate book
          book.ratingOverall = book.ratingOverall + rating;
          book.ratings.push({
            rating,
            username,
            createdAt: new Date().toISOString()
          });
        }

        await book.save();
        return book;
      } else throw new UserInputError("Book not found");
    },
    createBookComment: async (_, { bookId, title, body }, context) => {
      const { username } = checkAuth(context);

      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not empty"
          }
        });
      }

      const book = await Book.findById(bookId);

      if (book) {
        book.comments.unshift({
          title,
          body,
          username,
          createdAt: new Date().toISOString()
        });

        await book.save();
        return book;
      } else throw new UserInputError("Book not found");
    },
    deleteBookComment: async (_, { bookId, commentId }, context) => {
      const { username } = checkAuth(context);

      const book = await Book.findById(bookId);

      if (book) {
        const commentIndex = book.comments.findIndex(c => c.id === commentId);

        comment = book.comments[commentIndex];
        if (comment && comment.username === username) {
          book.comments.splice(commentIndex, 1);
          await book.save();

          return book;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Book not found");
      }
    }
  },
  Subscription: {
    newBook: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_BOOK")
    }
  }
};
