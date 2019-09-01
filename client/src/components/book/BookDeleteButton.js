import React from "react";
import gql from "graphql-tag";
import { Popconfirm, Icon, message } from "antd";
import { useMutation } from "@apollo/react-hooks";

import { FETCH_BOOKS_QUERY } from "../../utils/graphql";

const BookDeleteButton = ({ bookId, callback }) => {
  const [deleteBook] = useMutation(DELETE_BOOK_MUTATION, {
    variables: {
      bookId
    },
    update(proxy) {
      const data = proxy.readQuery({
        query: FETCH_BOOKS_QUERY
      });

      data.getBooks = data.getBooks.filter(b => b.id !== bookId);

      proxy.writeQuery({ query: FETCH_BOOKS_QUERY, data });

      if (callback) callback();
    }
  });

  return (
    <Popconfirm
      title="确认删除书籍吗？"
      onConfirm={() => {
        deleteBook();
        message.success("书籍已删除");
      }}
      okText="确认"
      cancelText="取消"
    >
      <Icon type="delete" style={{ marginRight: 8 }} />
      删除
    </Popconfirm>
  );
};

const DELETE_BOOK_MUTATION = gql`
  mutation deleteBook($bookId: ID!) {
    deleteBook(bookId: $bookId)
  }
`;

export default BookDeleteButton;
