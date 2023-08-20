import { MyCustomerDraft } from '@commercetools/platform-sdk';
import { Button, Col, DatePicker, Form, FormInstance, Input, Row, Space } from 'antd';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

import CustomerApi from '../../api/customerApi';
import { RegistrationFormType } from '../../types';

import BillingAddressSubForm from './AddressForms/BillingAddressSubForm';
import ShippingAddressSubForm from './AddressForms/ShippingAddressSubForm';

import styles from './registration.module.css';

const MIN_AGE = 16;
const MAX_AGE = 99;

const Registration: FC = (): JSX.Element => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [shippingAsBilling, setShippingAsBilling] = useState<boolean>(false);
  const [isDefaultBillingAddress, setIsDefaultBillingAddress] = useState<boolean>(false); // FIXME: Try to change naming
  const [isDefaultShippingAddress, setIsDefaultShippingAddress] = useState<boolean>(false); // FIXME: Try to change naming
  const navigate = useNavigate();
  const formRef = useRef<FormInstance>(null);

  const onFinish = (values: RegistrationFormType) => {
    const { email, password } = values;
    setConfirmLoading(true);

    const createCustomer = async (myCustomerDraft: MyCustomerDraft) => {
      try {
        await CustomerApi.customerSignUp(myCustomerDraft);
        await CustomerApi.customerSignIn({ username: email, password });
        await CustomerApi.getMyCustomerInfo(); // New user tokens stored in localStorage only after first request. So force it.
        navigate('/main');
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      } finally {
        setConfirmLoading(false); // don't delete this line
      }
    };

    const myCustomerDraft: MyCustomerDraft = CustomerApi.createMyCustomerDraft({
      ...values,
      isDefaultBillingAddress,
      isDefaultShippingAddress,
      shippingAsBilling,
    });
    void createCustomer(myCustomerDraft);
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };

  return (
    <Space className={classNames(styles.spaceWrapper)} direction="vertical" align="center">
      <p>
        Already have an account? <a href="/login">Sign In</a>.
      </p>
      <Form
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        labelWrap
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        ref={formRef}
        className={styles.form}
      >
        <Row justify={'center'}>
          <Col>
            <Form.Item<RegistrationFormType>
              label="First Name"
              name="firstName"
              rules={[
                { required: true, whitespace: true, message: 'Please enter your first name.' },
                {
                  pattern: /^[ A-Za-z-]{1,25}$/,
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
                  pattern: /^[ A-Za-z-]{1,25}$/,
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
                        : Promise.reject(
                            `Please enter a valid date. Your age should be from ${MIN_AGE} to ${MAX_AGE}.`,
                          );
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
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\d!#$%&*@A-Z^a-z]{8,25}$/,
                  message:
                    'Please enter a valid password. 8 characters minimum. Must include uppercase/lowercase letters and numbers.',
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
          </Col>
        </Row>

        <Row gutter={32} justify={'center'}>
          <Col>
            <BillingAddressSubForm
              isDefaultBillingAddress={isDefaultBillingAddress}
              setIsDefaultBillingAddress={setIsDefaultBillingAddress}
            />
          </Col>
          <Col>
            <ShippingAddressSubForm
              isDefaultShippingAddress={isDefaultShippingAddress}
              setIsDefaultShippingAddress={setIsDefaultShippingAddress}
              shippingAsBilling={shippingAsBilling}
              setShippingAsBilling={setShippingAsBilling}
            />
          </Col>
        </Row>

        <Row gutter={32} justify={'center'}>
          <Col>
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
            </Form.Item>
          </Col>
          <Col>
            <Button className={classNames(styles.button)} htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Col>
        </Row>
      </Form>
    </Space>
  );
};

export default Registration;
