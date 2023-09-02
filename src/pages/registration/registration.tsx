import { MailOutlined } from '@ant-design/icons';
import { MyCustomerDraft } from '@commercetools/platform-sdk';
import { Button, Col, DatePicker, Form, FormInstance, Input, Row, Space, message, Divider } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

import CustomerApi from '../../api/customerApi';
import { useAppDispatch } from '../../app/hooks';
import { userSlice } from '../../app/reducers';
import { RegistrationFormType } from '../../types';

import { ValidationMessage, ValidationPattern, ValidationAge } from '../../validationRules';

import BillingAddressSubForm from './AddressForms/BillingAddressSubForm';
import ShippingAddressSubForm from './AddressForms/ShippingAddressSubForm';

import styles from './registration.module.css';

const Registration: FC = (): JSX.Element => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [shippingAsBilling, setShippingAsBilling] = useState<boolean>(false);
  const [isDefaultBillingAddress, setIsDefaultBillingAddress] = useState<boolean>(true);
  const [isDefaultShippingAddress, setIsDefaultShippingAddress] = useState<boolean>(true);
  const navigate = useNavigate();
  const formRef = useRef<FormInstance>(null);
  const dispatch = useAppDispatch();

  const onFinish = (values: RegistrationFormType) => {
    const { email, password } = values;
    setConfirmLoading(true);

    const createCustomer = async (myCustomerDraft: MyCustomerDraft) => {
      try {
        await CustomerApi.customerSignUp(myCustomerDraft);
        const res = await CustomerApi.customerSignIn({ username: email, password });

        const { firstName, lastName, id: customerId } = res.body.customer;
        await message.success(`Welcome ${firstName || ''} ${lastName || ''}.\nYour id is: ${customerId}`);
        localStorage.setItem('customerId', customerId);
        dispatch(userSlice.actions.setLogIn(true));
        navigate('/main');
      } catch (error) {
        if (error instanceof Error) {
          await message.error(`Registration failed. ${error.message}`);
        }
      } finally {
        setConfirmLoading(false);
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
    <Space className={styles.spaceWrapper} direction="vertical" align="center">
      <Form
        name="basic"
        colon={true}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        labelWrap
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        ref={formRef}
        className={styles.form}
      >
        <Row justify={'center'} className={styles.registrationMain}>
          <Col span={24}>
            <p className={styles.registrationTitle}>Registration</p>

            <Divider className={styles.devider} />

            <Form.Item<RegistrationFormType>
              className={styles.regInput}
              label="First Name"
              name="firstName"
              rules={[
                { required: true, whitespace: true, message: 'Please enter a first name.' },
                {
                  pattern: new RegExp(ValidationPattern.FirstName),
                  message: ValidationMessage.FirstName,
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>

            <Form.Item<RegistrationFormType>
              className={styles.regInput}
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, whitespace: true, message: 'Please enter a last name.' },
                {
                  pattern: new RegExp(ValidationPattern.LastName),
                  message: ValidationMessage.LastName,
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>

            <Form.Item<RegistrationFormType>
              className={styles.regInput}
              label="Birthday"
              name="birthday"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  validator: (_, value: Dayjs) => {
                    const now = dayjs(Date.now());
                    const age = now.diff(value, 'year');
                    if (value) {
                      return age >= ValidationAge.MIN && age <= ValidationAge.MAX
                        ? Promise.resolve()
                        : Promise.reject(`Your age should be from ${ValidationAge.MIN} to ${ValidationAge.MIN}.`);
                    } else {
                      return Promise.reject('Please enter a date of birth');
                    }
                  },
                },
              ]}
              hasFeedback
            >
              <DatePicker className={styles.datePicker} />
            </Form.Item>

            <Form.Item<RegistrationFormType>
              className={styles.regInput}
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
                      return Promise.reject('Please input an email.');
                    }
                  },
                },
              ]}
              hasFeedback
            >
              <Input suffix={<MailOutlined style={{ color: 'grey' }} />} />
            </Form.Item>

            <Form.Item<RegistrationFormType>
              className={styles.regInput}
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input a password.' },
                {
                  pattern: new RegExp(ValidationPattern.Password),
                  message: ValidationMessage.Password,
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              className={styles.regInput}
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
                    return Promise.reject(new Error('Passwords do not match.'));
                  },
                }),
              ]}
            >
              <Input.Password visibilityToggle={false} />
            </Form.Item>
            <p className="toSignIn">
              Already have an account? <a onClick={() => navigate('/login')}>Sign In</a>.
            </p>
          </Col>
        </Row>

        <Row justify={'center'}>
          <Col>
            <BillingAddressSubForm
              isDefaultBillingAddress={isDefaultBillingAddress}
              setIsDefaultBillingAddress={setIsDefaultBillingAddress}
            />
          </Col>
        </Row>

        <Row justify={'center'}>
          <Col>
            <ShippingAddressSubForm
              isDefaultShippingAddress={isDefaultShippingAddress}
              setIsDefaultShippingAddress={setIsDefaultShippingAddress}
              shippingAsBilling={shippingAsBilling}
              setShippingAsBilling={setShippingAsBilling}
            />
          </Col>
        </Row>

        <Row justify={'center'} gutter={12}>
          <Col>
            <Form.Item>
              {!confirmLoading ? (
                <Button type="primary" htmlType="submit" style={{ width: '100px' }}>
                  Submit
                </Button>
              ) : (
                <Button type="primary" style={{ width: '100px' }} loading>
                  Submit
                </Button>
              )}
            </Form.Item>
          </Col>
          <Col>
            <Button className={styles.button} htmlType="button" style={{ width: '100px' }} onClick={onReset}>
              Reset
            </Button>
          </Col>
        </Row>
      </Form>
    </Space>
  );
};

export default Registration;
