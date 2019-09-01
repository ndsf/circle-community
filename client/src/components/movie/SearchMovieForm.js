import React from "react";
import { withRouter } from "react-router-dom";
import { Form, Input } from "antd";

const { Search } = Input;

const SearchMovieForm = props => {
  return (
    <Form>
      <Form.Item>
        <Search
          placeholder="搜索电影"
          onSearch={value => props.history.push(`/search/movies/${value}`)}
        />
      </Form.Item>
    </Form>
  );
};

export default withRouter(SearchMovieForm);
