import { Button, DatePicker, Form, FormInstance, Input, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

import styles from './registration.module.css';

type FieldType = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  birthday?: Dayjs;
  street?: string;
  city?: string;
  country?: string;
};

const MIN_AGE = 16;
const MAX_AGE = 99;

const Registration: FC = (): JSX.Element => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const formRef = useRef<FormInstance>(null);

  const onFinish = (values: FieldType) => {
    console.log('VALUES', values);
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
        label="First Name"
        name="firstName"
        rules={[
          { required: true, whitespace: true, message: 'Please enter your first name.' },
          {
            pattern: /^[ A-Za-z]{2,12}$/,
            message: 'Please enter a valid first name.',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Last Name"
        name="lastName"
        rules={[
          { required: true, whitespace: true, message: 'Please enter your last name.' },
          {
            pattern: /^[ A-Za-z]{2,12}$/,
            message: 'Please enter a valid last name.',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Birthday"
        name="birthday"
        rules={[
          {
            required: true,
            whitespace: true,
            validator: (_, value: Dayjs) => {
              const now = dayjs(Date.now());
              const age = now.diff(value, 'year');
              console.log(age);
              if (value) {
                return age >= MIN_AGE && age <= MAX_AGE
                  ? Promise.resolve()
                  : Promise.reject(`Please enter a valid date. Your age should be from ${MIN_AGE} to ${MAX_AGE}.`);
              } else {
                return Promise.reject('Please enter your date of birth');
              }
            },
          },
        ]}
        hasFeedback
      >
        <DatePicker />
      </Form.Item>

      <Form.Item<FieldType>
        label="Street"
        name="street"
        rules={[
          { required: true, whitespace: true, message: 'Please enter a street.' },
          {
            pattern: /^[ A-Za-z]{2,12}$/,
            message: 'Please enter a valid street.',
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
          { required: true, whitespace: true, message: 'Please enter a city.' },
          {
            pattern: /^[ A-Za-z]{2,12}$/,
            message: 'Please enter a valid city.',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        name="country"
        label="Country"
        rules={[{ required: true, message: 'Please select a country.' }]}
      >
        <Select placeholder="Select country" allowClear>
          <Select.Option value="DE">Germany</Select.Option>
          <Select.Option value="US">United States</Select.Option>
          <Select.Option value="AU">Australia</Select.Option>
          <Select.Option value="ES">Spain</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            whitespace: true,
            validator: (_, value: string) => {
              if (value) {
                return isEmail(value) ? Promise.resolve() : Promise.reject('Please enter valid email.');
              } else {
                return Promise.reject('Please input your email.');
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
          { required: true, message: 'Please input your password.' },
          {
            pattern: /^(?=.*\d)(?=.*[!#$%&*@^])(?=.*[a-z])(?=.*[A-Z])[\d!#$%&*@A-Z^a-z]{8,12}$/,
            message: 'Please enter valid password.',
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
            message: 'Please confirm your password.',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match.'));
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
