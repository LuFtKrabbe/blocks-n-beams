import { Button, Form, FormInstance, Input, Space } from 'antd';
import classNames from 'classnames';
import { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

import CustomerApi from '../../api/customerApi';

import styles from './login.module.css';

type FieldType = {
  email: string;
  password: string;
};

const Login: FC = (): JSX.Element => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const formRef = useRef<FormInstance>(null);

  const onFinish = ({ email, password }: FieldType) => {
    setConfirmLoading(true);

    const login = async () => {
      try {
        await CustomerApi.customerSignIn({ username: email, password });
        navigate('/main');
      } finally {
        setConfirmLoading(false);
      }
    };

    void login();
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };

  return (
    <Space className={classNames(styles.spaceWrapper)} direction="vertical" align="center">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        className={classNames(styles.form)}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        ref={formRef}
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              whitespace: true,
              validator: (_, value: string) => {
                if (value) {
                  return isEmail(value) ? Promise.resolve() : Promise.reject('Please enter a valid email.');
                } else {
                  return Promise.reject('Please enter your email.');
                }
              },
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please enter your password.' },
            {
              pattern: /^(?=.*\d)(?=.*[!#$%&*@^])(?=.*[a-z])(?=.*[A-Z])[\d!#$%&*@A-Z^a-z]{8,20}$/,
              message: 'Please enter a valid password.',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          {!confirmLoading ? (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          ) : (
            <Button type="primary" loading>
              Submit
            </Button>
          )}
          <Button className={classNames(styles.button)} htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
      <p>
        Don't have an account? <a href="/registration">Sign Up</a>.
      </p>
    </Space>
  );
};

export default Login;
