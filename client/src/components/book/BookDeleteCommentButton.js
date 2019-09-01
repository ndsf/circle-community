import React from "react";
import gql from "graphql-tag";
import { Popconfirm, Icon, message } from "antd";
import { useMutation } from "@apollo/react-hooks";

const BookDeleteCommentButton = ({ bookId, commentId, callback }) => {
  const [deleteBookComment] = useMutation(DELETE_BOOK_COMMENT_MUTATION, {
    variables: {
      bookId,
      commentId
    },
    update(proxy) {
      if (callback) callback();
    }
  });

  return (
    <Popconfirm
      title="确认删除书评吗？"
      onConfirm={() => {
        deleteBookComment();
        message.success("书评已删除");
      }}
      okText="确认"
      cancelText="取消"
    >
      <Icon type="delete" style={{ marginRight: 8 }} />
      删除
    </Popconfirm>
  );
};

const DELETE_BOOK_COMMENT_MUTATION = gql`
  mutation deleteBookComment($bookId: ID!, $commentId: ID!) {
    deleteBookComment(bookId: $bookId, commentId: $commentId) {
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

export default BookDeleteCommentButton;
