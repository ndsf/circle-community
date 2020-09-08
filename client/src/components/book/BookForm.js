import React from "react";
import { Upload, message, Icon, Button, Form, Input } from "antd";

import { useForm } from "../../utils/hooks";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_BOOKS_QUERY } from "../../utils/graphql";
import { slugify } from "transliteration";

const { TextArea } = Input;

const BookForm = () => {
  const { values, onChange, onSubmit, setAvatar } = useForm(
    createBookCallBack,
    {
      body: "",
      author: "",
      pub: "",
      yearOfPub: "",
      pages: "",
      price: "",
      ISBN: "",
      bio: "",
      avatar: ""
    }
  );

  const [createBook, { error }] = useMutation(CREATE_BOOK_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_BOOKS_QUERY
      });

      data.getBooks = [result.data.createBook, ...data.getBooks];
      proxy.writeQuery({ query: FETCH_BOOKS_QUERY, data });
      values.body = "";
      values.author = "";
      values.pub = "";
      values.yearOfPub = "";
      values.pages = "";
      values.price = "";
      values.ISBN = "";
      values.bio = "";
      values.avatar = "";
    }
  });

  const props = {
    name: "file",
    accept: ".png, .jpg, .jpeg",
    action: "http://localhost:5000/upload",
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(
          `${slugify(info.file.name, {
            ignore: ["."]
          })} file uploaded successfully`
        );
        //setFilePath(`/uploads/${slugify(info.file.name, { ignore: ['.'] })}`);
        setAvatar(`/uploads/${slugify(info.file.name, { ignore: ["."] })}`);
      } else if (info.file.status === "error") {
        //message.error(`${slugify(info.file.name, { ignore: ['.'] })} file upload failed.`);
        setAvatar(`/uploads/${slugify(info.file.name, { ignore: ["."] })}`);
      }
    }
  };

  function createBookCallBack() {
    createBook();
  }

  return (
    <Form layout="vertical" onSubmit={onSubmit}>
      <Form.Item label="标题">
        <Input
          placeholder="标题"
          name="body"
          onChange={onChange}
          value={values.body}
          error={error}
        />
      </Form.Item>
      <Form.Item label="作者">
        <Input
          placeholder="作者（半角逗号分割）"
          name="author"
          onChange={onChange}
          value={values.author}
          error={error}
        />
      </Form.Item>
      <Form.Item label="出版社">
        <Input
          placeholder="出版社"
          name="pub"
          onChange={onChange}
          value={values.pub}
          error={error}
        />
      </Form.Item>
      <Form.Item label="出版年份">
        <Input
          placeholder="出版年份"
          name="yearOfPub"
          onChange={onChange}
          value={values.yearOfPub}
          error={error}
        />
      </Form.Item>
      <Form.Item label="页数">
        <Input
          placeholder="页数"
          name="pages"
          onChange={onChange}
          value={values.pages}
          error={error}
        />
      </Form.Item>
      <Form.Item label="价格">
        <Input
          placeholder="价格"
          name="price"
          onChange={onChange}
          value={values.price}
          error={error}
        />
      </Form.Item>
      <Form.Item label="ISBN">
        <Input
          placeholder="ISBN"
          name="ISBN"
          onChange={onChange}
          value={values.ISBN}
          error={error}
        />
      </Form.Item>
      <Form.Item label="简介">
        <TextArea
          placeholder="简介"
          name="bio"
          onChange={onChange}
          value={values.bio}
          error={error}
          autosize={{ minRows: 3, maxRows: 5 }}
        />
      </Form.Item>
      <Form.Item label="图片">
        <Input
          placeholder="图片"
          name="avatar"
          onChange={onChange}
          value={values.avatar}
          error={error}
        />
      </Form.Item>
      <Form.Item>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> 上传图片
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

const CREATE_BOOK_MUTATION = gql`
  mutation createBook(
    $body: String!
    $author: String!
    $pub: String!
    $yearOfPub: String!
    $pages: String!
    $price: String!
    $ISBN: String!
    $bio: String!
    $avatar: String!
  ) {
    createBook(
      body: $body
      author: $author
      pub: $pub
      yearOfPub: $yearOfPub
      pages: $pages
      price: $price
      ISBN: $ISBN
      bio: $bio
      avatar: $avatar
    ) {
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
        body
      }
    }
  }
`;

export default BookForm;
