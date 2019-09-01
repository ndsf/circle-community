import React from "react";
import { Upload, message, Icon, Button, Form, Input } from "antd";

import { useForm } from "../../utils/hooks";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_MOVIES_QUERY } from "../../utils/graphql";
import { slugify } from "transliteration";

const { TextArea } = Input;

const MovieForm = () => {
  const { values, onChange, onSubmit, setAvatar } = useForm(
    createMovieCallBack,
    {
      body: "",
      director: "",
      screenwriter: "",
      starring: "",
      type: "",
      region: "",
      language: "",
      releaseDate: "",
      length: "",
      alias: "",
      bio: "",
      avatar: ""
    }
  );

  const [createMovie, { error }] = useMutation(CREATE_MOVIE_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_MOVIES_QUERY
      });

      data.getMovies = [result.data.createMovie, ...data.getMovies];
      proxy.writeQuery({ query: FETCH_MOVIES_QUERY, data });
      values.body = "";
      values.director = "";
      values.screenwriter = "";
      values.starring = "";
      values.type = "";
      values.region = "";
      values.language = "";
      values.releaseDate = "";
      values.length = "";
      values.alias = "";
      values.bio = "";
      values.avatar = "";
    }
  });

  const props = {
    name: "file",
    accept: ".png, .jpg, .jpeg",
    action: "http://114.115.149.7:5000/upload",
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

  function createMovieCallBack() {
    createMovie();
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
      <Form.Item label="导演">
        <Input
          placeholder="导演（半角逗号分割）"
          name="director"
          onChange={onChange}
          value={values.director}
          error={error}
        />
      </Form.Item>
      <Form.Item label="编剧">
        <Input
          placeholder="编剧（半角逗号分割）"
          name="screenwriter"
          onChange={onChange}
          value={values.screenwriter}
          error={error}
        />
      </Form.Item>
      <Form.Item label="主演">
        <Input
          placeholder="主演（半角逗号分割）"
          name="starring"
          onChange={onChange}
          value={values.starring}
          error={error}
        />
      </Form.Item>
      <Form.Item label="类型">
        <Input
          placeholder="类型（半角逗号分割）"
          name="type"
          onChange={onChange}
          value={values.type}
          error={error}
        />
      </Form.Item>
      <Form.Item label="地区">
        <Input
          placeholder="地区"
          name="region"
          onChange={onChange}
          value={values.region}
          error={error}
        />
      </Form.Item>
      <Form.Item label="语言">
        <Input
          placeholder="语言"
          name="language"
          onChange={onChange}
          value={values.language}
          error={error}
        />
      </Form.Item>
      <Form.Item label="上映日期">
        <Input
          placeholder="上映日期"
          name="releaseDate"
          onChange={onChange}
          value={values.releaseDate}
          error={error}
        />
      </Form.Item>
      <Form.Item label="片长">
        <Input
          placeholder="片长"
          name="length"
          onChange={onChange}
          value={values.length}
          error={error}
        />
      </Form.Item>
      <Form.Item label="别名">
        <Input
          placeholder="别名"
          name="alias"
          onChange={onChange}
          value={values.alias}
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

const CREATE_MOVIE_MUTATION = gql`
  mutation createMovie(
    $body: String!
    $director: String!
    $screenwriter: String!
    $starring: String!
    $type: String!
    $region: String!
    $language: String!
    $releaseDate: String!
    $length: String!
    $alias: String!
    $bio: String!
    $avatar: String!
  ) {
    createMovie(
      body: $body
      director: $director
      screenwriter: $screenwriter
      starring: $starring
      type: $type
      region: $region
      language: $language
      releaseDate: $releaseDate
      length: $length
      alias: $alias
      bio: $bio
      avatar: $avatar
    ) {
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
        body
      }
    }
  }
`;

export default MovieForm;
