import { Button, Form, FormInstance, Input, Select } from 'antd';
import { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './registration.module.css';

type FieldType = {
  email?: string;
  password?: string;
  name?: string;
  surname?: string;
  birthday?: string;
  street?: string;
  city?: string;
  country?: string;
};

const Registration: FC = (): JSX.Element => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const formRef = useRef<FormInstance>(null);

  const onFinish = (values: string) => {
    setConfirmLoading(true);
    const isSuccessLogin = true;
    try {
      //Simulate sending a message
      console.log(values);
      setTimeout(() => {
        if (isSuccessLogin) {
          navigate('/main'); // don't delete this line
        }
      }, 2000);
    } finally {
      //Simulate loading
      setTimeout(() => {
        setConfirmLoading(false); // don't delete this line
      }, 1000);
    }
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 400 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      ref={formRef}
      className={styles.form}
    >
      <Form.Item<FieldType>
        label="Name"
        name="name"
        rules={[
          { required: true, whitespace: true, message: 'Please input your name!' },
          {
            pattern: /^[ A-Za-z]{2,12}$/,
            message: 'Please enter valid name!',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Surname"
        name="surname"
        rules={[
          { required: true, whitespace: true, message: 'Please input your surname!' },
          {
            pattern: /^[ A-Za-z]{2,12}$/,
            message: 'Please enter valid surname!',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Birthday"
        name="birthday"
        tooltip="year-month-day"
        rules={[
          { required: true, whitespace: true, message: 'Please input your birthday!' },
          {
            pattern: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
            message: 'Please enter valid birthday!',
          },
        ]}
        hasFeedback
      >
        <Input placeholder="xxxx-xx-xx" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Street"
        name="street"
        rules={[
          { required: true, whitespace: true, message: 'Please input street!' },
          {
            pattern: /^[ A-Za-z]{2,12}$/,
            message: 'Please enter valid street!',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="City"
        name="city"
        rules={[
          { required: true, whitespace: true, message: 'Please input city!' },
          {
            pattern: /^[ A-Za-z]{2,12}$/,
            message: 'Please enter valid city!',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        name="country"
        label="Country"
        rules={[{ required: true, message: 'Please input country!' }]}
      >
        <Select placeholder="Select country" allowClear>
          <Select.Option value="Germany">Germany</Select.Option>
          <Select.Option value="United States">United States</Select.Option>
          <Select.Option value="Australia">Australia</Select.Option>
          <Select.Option value="Spain">Spain</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[
          { required: true, whitespace: true, message: 'Please input your email!' },
          {
            pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            message: 'Please enter valid email!',
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
          { required: true, message: 'Please input your password!' },
          {
            pattern: /^(?=.*\d)(?=.*[!#$%&*@^])(?=.*[a-z])(?=.*[A-Z])[\d!#$%&*@A-Z^a-z]{8,12}$/,
            message: 'Please enter valid password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
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
        <Button className={styles.button} htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Registration;
