import React from "react";
import { withRouter } from "react-router-dom";
import { Form, Input } from "antd";

const { Search } = Input;

const SearchBookForm = props => {
  return (
    <Form>
      <Form.Item>
        <Search
          placeholder="搜索书籍"
          onSearch={value => props.history.push(`/search/books/${value}`)}
        />
      </Form.Item>
    </Form>
  );
};

export default withRouter(SearchBookForm);
