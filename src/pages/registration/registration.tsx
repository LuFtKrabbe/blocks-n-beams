import { Button, DatePicker, Form, FormInstance, Input } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

import BillingAddressForm from './AddressForms/BillingAddressForm';
import ShippingAddressForm from './AddressForms/ShippingAddressForm';

import styles from './registration.module.css';

export type RegistrationFormType = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  birthday?: Dayjs;
  billingFirstName?: string;
  billingLastName?: string;
  billingStreetName?: string;
  billingAdditionalStreetInfo?: string;
  billingCity?: string;
  billingRegion?: string;
  billingCountry?: string;
  billingPostalCode?: string;
  billingPhone?: string;
  shippingFirstName?: string;
  shippingLastName?: string;
  shippingStreetName?: string;
  shippingAdditionalStreetInfo?: string;
  shippingCity?: string;
  shippingRegion?: string;
  shippingCountry?: string;
  shippingPostalCode?: string;
  shippingPhone?: string;
};

const MIN_AGE = 16;
const MAX_AGE = 99;

const Registration: FC = (): JSX.Element => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const formRef = useRef<FormInstance>(null);

  const onFinish = (values: RegistrationFormType) => {
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
      <Form.Item<RegistrationFormType>
        label="First Name"
        name="firstName"
        rules={[
          { required: true, whitespace: true, message: 'Please enter your first name.' },
          {
            pattern: /^[ A-Za-z]{1,12}$/,
            message: 'Please enter a valid first name.',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item<RegistrationFormType>
        label="Last Name"
        name="lastName"
        rules={[
          { required: true, whitespace: true, message: 'Please enter your last name.' },
          {
            pattern: /^[ A-Za-z]{1,12}$/,
            message: 'Please enter a valid last name.',
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item<RegistrationFormType>
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

      <Form.Item<RegistrationFormType>
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

      <Form.Item<RegistrationFormType>
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
      <BillingAddressForm />
      <ShippingAddressForm />
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
