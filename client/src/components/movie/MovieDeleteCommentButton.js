import React from "react";
import gql from "graphql-tag";
import { Popconfirm, Icon, message } from "antd";
import { useMutation } from "@apollo/react-hooks";

const MovieDeleteCommentButton = ({ movieId, commentId, callback }) => {
  const [deleteMovieComment] = useMutation(DELETE_MOVIE_COMMENT_MUTATION, {
    variables: {
      movieId,
      commentId
    },
    update(proxy) {
      if (callback) callback();
    }
  });

  return (
    <Popconfirm
      title="确认删除影评吗？"
      onConfirm={() => {
        deleteMovieComment();
        message.success("影评已删除");
      }}
      okText="确认"
      cancelText="取消"
    >
      <Icon type="delete" style={{ marginRight: 8 }} />
      删除
    </Popconfirm>
  );
};

const DELETE_MOVIE_COMMENT_MUTATION = gql`
  mutation deleteMovieComment($movieId: ID!, $commentId: ID!) {
    deleteMovieComment(movieId: $movieId, commentId: $commentId) {
      id
      comments {
        id
        title
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

export default MovieDeleteCommentButton;
