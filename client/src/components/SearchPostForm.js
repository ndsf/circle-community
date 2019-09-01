import React from "react";
import { Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useForm } from "../utils/hooks";

const SearchPostForm = () => {
  const { values, onChange } = useForm(searchPostCallBack, {
    keyword: ""
  });

  function searchPostCallBack() {}

  return (
    <div>
      <Form>
        <h2>Search post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Keyword"
            name="keyword"
            onChange={onChange}
            value={values.keyword}
          />
          <Button as={Link} to={`/search/posts/${values.keyword}`}>
            Submit
          </Button>
        </Form.Field>
      </Form>
    </div>
  );
};

export default SearchPostForm;
