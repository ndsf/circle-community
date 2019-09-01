const postsResolvers = require("./posts");
const booksResolvers = require("./books");
const moviesResolvers = require("./movies");
const groupsResolvers = require("./groups");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");

module.exports = {
  Post: {
    likeCount: parent => parent.likes.length,
    reportCount: parent => parent.reports.length,
    commentCount: parent => parent.comments.length
  },
  Book: {
    ratingCount: parent =>
      (parent.ratings.length
        ? parent.ratingOverall / parent.ratings.length
        : 0
      ).toFixed(1),
    commentCount: parent => parent.comments.length
  },
  Movie: {
    ratingCount: parent =>
      (parent.ratings.length
        ? parent.ratingOverall / parent.ratings.length
        : 0
      ).toFixed(1),
    commentCount: parent => parent.comments.length
  },
  Group: {
    likeCount: parent => parent.likes.length,
    postCount: parent => parent.posts.length,
    applyCount: parent => parent.applies.length
  },
  Query: {
    ...postsResolvers.Query,
    ...booksResolvers.Query,
    ...moviesResolvers.Query,
    ...groupsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...booksResolvers.Mutation,
    ...moviesResolvers.Mutation,
    ...groupsResolvers.Mutation,
    ...commentsResolvers.Mutation
  },
  Subscription: {
    ...postsResolvers.Subscription
  }
};
