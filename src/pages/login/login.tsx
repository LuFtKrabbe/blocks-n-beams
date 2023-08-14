import { Button, Form, FormInstance, Input } from 'antd';
import { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiRoot from '../../api/ClientBuilder';

import styles from './login.module.css';

type FieldType = {
  email?: string;
  password?: string;
};

const Login: FC = (): JSX.Element => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const formRef = useRef<FormInstance>(null);

  const onFinish = ({ email, password }: FieldType) => {
    setConfirmLoading(true);

    const apiLogin = async (email: string, password: string) => {
      try {
        const res = await apiRoot.login().post({ body: { email, password } }).execute();
        const { firstName, lastName, id: customerId } = res.body.customer;
        console.log(`Welcome ${firstName || ''} ${lastName || ''}.\nYour id is: ${customerId}`);
        navigate('/main');
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      } finally {
        setConfirmLoading(false);
      }
    };

    if (email !== undefined && password !== undefined) {
      void apiLogin(email, password);
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

export default Login;
