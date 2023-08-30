import { Button, Checkbox, Form, Input, Space, message } from 'antd';
import { FC, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import CustomerApi from '../../api/customerApi';

import { useAppDispatch } from '../../app/hooks';
import { userSlice } from '../../app/reducers';

import styles from './profile.module.css';

type FieldType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const Profile: FC = (): JSX.Element => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  useEffect(() => {
    const customerId = localStorage.getItem('customerId') ? localStorage.getItem('customerId') : '';
    if (customerId) {
      const fetchData = async () => {
        try {
          const res = await CustomerApi.getCustomer(customerId);
          const { email, password, firstName, lastName } = res.body;
          console.log('customer info', res.body);
          form.setFieldsValue({ email, password, firstName, lastName });
        } catch (error) {
          if (error instanceof Error) {
            await message.error(`Failed. ${error.message}`);
          }
        }
      };
      void fetchData();
    }
  });

  const onFinish = (value: FieldType) => {
    console.log(value);
  };

  const logOut = () => {
    CustomerApi.customerLogOut();
    localStorage.removeItem('customerId');
    dispatch(userSlice.actions.setLogInStorage(true));
    navigate('/main');
  };

  return (
    <>
      <div className={styles.checkboxWrapper}>
        <Checkbox checked={componentDisabled} onChange={(e) => setComponentDisabled(e.target.checked)}>
          Edit Fields
        </Checkbox>
      </div>
      <Form
        className={styles.spaceWrapper}
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 400 }} // TODO: Maybe we should move all styles to CSS
        autoComplete="off"
        onFinish={onFinish}
        disabled={componentDisabled}
      >
        <Form.Item<FieldType> label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item<FieldType> label="Password" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item<FieldType> label="First Name" name="firstName">
          <Input />
        </Form.Item>
        <Form.Item<FieldType> label="Last Name" name="lastName">
          <Input />
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
        </Form.Item>
      </Form>
      <Space className={styles.logoutButtonContainer}>
        <Button className={styles.btn} type="primary" htmlType="submit" onClick={logOut}>
          Log Out
        </Button>
      </Space>
    </>
  );
};

export default Profile;
