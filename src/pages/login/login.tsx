import { LoginOutlined } from '@ant-design/icons';
import { Button, Col, Form, FormInstance, Input, Row, Space, message, Divider } from 'antd';
import { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

import CustomerApi from '../../api/customerApi';

import { useAppDispatch } from '../../app/hooks';
import { userSlice } from '../../app/reducers';

import { ValidationMessage, ValidationPattern } from '../../validationRules';

import styles from './login.module.css';

type FieldType = {
  email: string;
  password: string;
};

const Login: FC = (): JSX.Element => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const formRef = useRef<FormInstance>(null);
  const dispatch = useAppDispatch();

  const onFinish = ({ email, password }: FieldType) => {
    setConfirmLoading(true);

    const login = async () => {
      try {
        const res = await CustomerApi.customerSignIn({ username: email, password });

        const { firstName, lastName, id: customerId } = res.body.customer;
        await message.success(
          <>
            <span style={{ fontSize: '1.0rem', fontWeight: 'bold' }}>
              {`Welcome ${firstName || ''} ${lastName || ''}!`}
            </span>
            <p style={{ fontSize: '0.8rem' }}>{`Your id: ${customerId}`}</p>
          </>,
        );
        localStorage.setItem('customerId', customerId);
        dispatch(userSlice.actions.setLogIn(true));
        navigate('/main');
      } catch (error) {
        if (error instanceof Error) {
          await message.error(`Login failed. ${error.message}`);
        }
      } finally {
        setConfirmLoading(false);
      }
    };

    void login();
  };

  return (
    <Space className={styles.spaceWrapper} direction="vertical" align="center">
      <Form
        name="loginForm"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        className={styles.login}
        initialValues={{ remember: true }}
        layout={'vertical'}
        onFinish={onFinish}
        autoComplete="off"
        ref={formRef}
      >
        <p className={styles.loginTitle}>Sign in to Block & Beams</p>

        <Divider className={styles.dividerTop} />

        <Row justify={'center'}>
          <Col span={24}>
            <Form.Item<FieldType>
              className={styles.input}
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
                  pattern: new RegExp(ValidationPattern.Password),
                  message: ValidationMessage.Password,
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>

        <Row justify={'center'} align={'middle'}>
          <Col span={24}>
            <Form.Item>
              {!confirmLoading ? (
                <Button type="primary" htmlType="submit" block={true} icon={<LoginOutlined />}>
                  Login
                </Button>
              ) : (
                <Button type="primary" htmlType="submit" block={true} icon={<LoginOutlined />} loading>
                  Login
                </Button>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Divider className={styles.dividerBottom} />

        <Row justify={'center'}>
          <Col>
            <p>
              Don't have an account? <a onClick={() => navigate('/registration')}>Sign Up</a>.
            </p>
          </Col>
        </Row>
      </Form>
    </Space>
  );
};

export default Login;
