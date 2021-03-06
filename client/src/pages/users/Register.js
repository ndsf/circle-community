import React, { useContext, useState } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input } from "antd";
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../../context/auth';
import { useForm } from '../../utils/hooks';

const Register = props => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: '',
    password: '',
    email: '',
    confirmPassword: ''
  });

  const [registerUser] = useMutation(REGISTER_USER, {
    update(
      _,
      {
        data: { register: userData }
      }
    ) {
      context.login(userData);
      props.history.goBack();
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function registerUserCallback() {
    registerUser();
  }

  return (
    <div>
      <Form layout="vertical" onSubmit={onSubmit}>
        <h1>Register</h1>
        <Form.Item label="用户名">
          <Input
            placeholder="Username"
            name="username"
            type="text"
            value={values.username}
            error={errors.username ? 1 : 0}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item label="电子邮箱">
          <Input
            placeholder="Email"
            name="email"
            type="email"
            value={values.email}
            error={errors.email ? 1 : 0}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item label="密码">
          <Input
            placeholder="Password"
            name="password"
            type="password"
            value={values.password}
            error={errors.password ? 1 : 0}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item label="确认密码">
          <Input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            error={errors.confirmPassword ? 1 : 0}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            注册
          </Button>
        </Form.Item>
      </Form >
      {
        Object.keys(errors).length > 0 && (
          <ul>
            {Object.values(errors).map(err => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )
      }
    </div>
  );
};

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

export default Register;
