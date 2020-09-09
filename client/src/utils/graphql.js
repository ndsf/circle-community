import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const FETCH_POSTS_BY_BODY_QUERY = gql`
  query getPostsByBody($keyword: String!) {
    getPostsByBody(keyword: $keyword) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const FETCH_MOVIES_QUERY = gql`
  {
    getMovies {
      id
      body
      createdAt
      username
      director
      screenwriter
      starring
      type
      region
      language
      releaseDate
      length
      alias
      bio
      avatar
      ratingCount
      ratings {
        id
        rating
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        title
        body
      }
    }
  }
`;

export const FETCH_MOVIES_BY_BODY_QUERY = gql`
  query getMoviesByBody($keyword: String!) {
    getMoviesByBody(keyword: $keyword) {
      id
      body
      createdAt
      username
      director
      screenwriter
      starring
      type
      region
      language
      releaseDate
      length
      alias
      bio
      avatar
      ratingCount
      ratings {
        rating
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        title
        body
      }
    }
  }
`;

export const FETCH_BOOKS_QUERY = gql`
  {
    getBooks {
      id
      body
      createdAt
      username
      author
      pub
      yearOfPub
      pages
      price
      ISBN
      bio
      avatar
      ratingCount
      ratings {
        id
        rating
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        title
        body
      }
    }
  }
`;

export const FETCH_BOOKS_BY_BODY_QUERY = gql`
  query getBooksByBody($keyword: String!) {
    getBooksByBody(keyword: $keyword) {
      id
      body
      createdAt
      username
      author
      pub
      yearOfPub
      pages
      price
      ISBN
      bio
      avatar
      ratingCount
      ratings {
        rating
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        title
        body
      }
    }
  }
`;

export const FETCH_GROUPS_QUERY = gql`
  {
    getGroups {
      id
      body
      createdAt
      username
      bio
      avatar
      posts {
        id
        username
        title
        body
        createdAt
      }
      likeCount
      likes {
        id
        createdAt
        username
      }
      admins {
        createdAt
        username
      }
    }
  }
`;

export const FETCH_GROUPS_BY_BODY_QUERY = gql`
  query getGroupsByBody($keyword: String!) {
    getGroupsByBody(keyword: $keyword) {
      id
      body
      createdAt
      username
      bio
      avatar

      likeCount
      likes {
        createdAt
        username
      }
      admins {
        createdAt
        username
      }
    }
  }
`;

export const FETCH_USER_QUERY = gql`
    query getUser($username: String!) {
        getUser(username: $username) {
            id
            username
            email
            createdAt
            isTeacher
            notifications {
                id
                body
                createdAt
                username
            }
        }
    }
`;