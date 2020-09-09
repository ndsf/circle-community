const { gql } = require("apollo-server-express");

module.exports = gql`
  type Post {
    id: ID!
    title: String
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]
    likes: [Like]!
    reports: [Like]!
    likeCount: Int
    reportCount: Int
    commentCount: Int
    top: Boolean
    qualified: Boolean
  }

  type Book {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    author: [String]!
    pub: String!
    yearOfPub: String!
    pages: String!
    price: String!
    ISBN: String!
    bio: String!
    avatar: String!
    comments: [Comment]!
    ratings: [Rating]!
    ratingCount: Float!
    ratingOverall: Int!
    commentCount: Int!
  }

  type Movie {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    director: [String]!
    screenwriter: [String]!
    starring: [String]!
    type: [String]!
    region: String!
    language: String!
    releaseDate: String!
    length: String!
    alias: String!
    bio: String!
    avatar: String!
    comments: [Comment]!
    ratings: [Rating]!
    ratingCount: Float!
    ratingOverall: Int!
    commentCount: Int!
  }

  type Group {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    bio: String!
    avatar: String!
    posts: [Post]!
    likes: [Like]!
    admins: [Like]!
    likeCount: Int!
    postCount: Int!
    applies: [Comment]!
    applyCount: Int!
    admissions: [Comment]!
    admissionCount: Int!
  }

  type Comment {
    id: ID!
    title: String
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]
  }

  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }

  type Rating {
    id: ID!
    rating: Int!
    username: String!
    createdAt: String!
  }
  
  type Notification {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    isTeacher: Boolean!
    notifications: [Notification]!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getUser(username: String!): User
    getPosts: [Post]
    getPost(postId: ID!): Post
    getPostsByBody(keyword: String!): [Post]
    getBooks: [Book]
    getBook(bookId: ID!): Book
    getBooksByBody(keyword: String!): [Book]
    getMovies: [Movie]
    getMovie(movieId: ID!): Movie
    getMoviesByBody(keyword: String!): [Movie]
    getGroups: [Group]
    getGroup(groupId: ID!): Group
    getGroupsByBody(keyword: String!): [Group]
    getGroupPost(groupId: ID!, postId: ID!): Post
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    changePassword(password: String!): User!
    resetPassword(username: String!, email: String!): User!
    sendNotification(username: String!, body: String!): String!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, title: String, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    createBook(
      body: String!
      author: String!
      pub: String!
      yearOfPub: String!
      pages: String!
      price: String!
      ISBN: String!
      bio: String!
      avatar: String!
    ): Book!
    deleteBook(bookId: ID!): String!
    createBookComment(bookId: ID!, title: String, body: String!): Book!
    deleteBookComment(bookId: ID!, commentId: ID!): Book!
    rateBook(bookId: ID!, rating: Int!): Book!
    createMovie(
      body: String!
      director: String!
      screenwriter: String!
      starring: String!
      type: String!
      region: String!
      language: String!
      releaseDate: String!
      length: String!
      alias: String!
      bio: String!
      avatar: String!
    ): Movie!
    deleteMovie(movieId: ID!): String!
    createMovieComment(movieId: ID!, title: String, body: String!): Movie!
    deleteMovieComment(movieId: ID!, commentId: ID!): Movie!
    rateMovie(movieId: ID!, rating: Int!): Movie!
    createGroup(body: String!, bio: String!, avatar: String!): Group!
    deleteGroup(groupId: ID!): String!
    likeGroup(groupId: ID!): Group!
    importGroupLikes(groupId: ID!, usernames: String!): Group! # split into usernames
    createGroupPost(groupId: ID!, title: String!, body: String!): Group!
    deleteGroupPost(groupId: ID!, postId: ID!, reason: String!): Group!
    reportGroupPost(groupId: ID!, postId: ID!): Group!
    removeGroupPostReport(groupId: ID!, postId: ID!, reportId: ID!): Group!
    likeGroupPost(groupId: ID!, postId: ID!): Group!
    topGroupPost(groupId: ID!, postId: ID!): Group!
    qualifiedGroupPost(groupId: ID!, postId: ID!): Group!
    createGroupPostComment(
      groupId: ID!
      postId: ID!
      title: String!
      body: String!
    ): Post!
    deleteGroupPostComment(groupId: ID!, postId: ID!, commentId: ID!): Post!
    applyGroupAdmin(groupId: ID!, title: String!, body: String!): Group!
    grantGroupAdmin(groupId: ID!, name: String!): Group!
    applyGroupAdmission(groupId: ID!, body: String!): Group!
    grantGroupAdmission(groupId: ID!, name: String!): Group!
    createGroupPostSecondaryComment(
      groupId: ID!
      postId: ID!
      commentId: ID!
      title: String!
      body: String!
    ): Post!
    deleteGroupPostSecondaryComment(groupId: ID!, postId: ID!, commentId: ID!, secondaryId: ID!): Post!
  }

  type Subscription {
    newPost: Post!
  }
`;
