import React from "react";
import gql from "graphql-tag";
import { Popconfirm, Icon, message } from "antd";
import { useMutation } from "@apollo/react-hooks";

import { FETCH_MOVIES_QUERY } from "../../utils/graphql";

const MovieDeleteButton = ({ movieId, callback }) => {
  const [deleteMovie] = useMutation(DELETE_MOVIE_MUTATION, {
    variables: {
      movieId
    },
    update(proxy) {
      const data = proxy.readQuery({
        query: FETCH_MOVIES_QUERY
      });

      data.getMovies = data.getMovies.filter(m => m.id !== movieId);

      proxy.writeQuery({ query: FETCH_MOVIES_QUERY, data });

      if (callback) callback();
    }
  });

  return (
    <Popconfirm
      title="确认删除影视吗？"
      onConfirm={() => {
        deleteMovie();
        message.success("影视已删除");
      }}
      okText="确认"
      cancelText="取消"
    >
      <Icon type="delete" style={{ marginRight: 8 }} />
      删除
    </Popconfirm>
  );
};

const DELETE_MOVIE_MUTATION = gql`
  mutation deleteMovie($movieId: ID!) {
    deleteMovie(movieId: $movieId)
  }
`;

export default MovieDeleteButton;
