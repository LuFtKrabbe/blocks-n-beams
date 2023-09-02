import { Customer } from '@commercetools/platform-sdk';
import { Button, Form, Space, message } from 'antd';
import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import CustomerApi from '../../api/customerApi';

import { useAppDispatch } from '../../app/hooks';
import { userSlice } from '../../app/reducers';

import { RegistrationFormType } from '../../types';

import AddressCards from './AddressCards/AddressCards';
import ChangePasswordModal from './modals/ChangePasswordModal';
import EditCustomerModal from './modals/EditCustomerModal';
import styles from './profile.module.css';

const Profile: FC = (): JSX.Element => {
  const [isEditCustomerModalOpen, setIsEditCustomerModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [form] = Form.useForm<RegistrationFormType>();

  const [customerInfo, setCustomerInfo] = useState<Customer>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const customerId = localStorage.getItem('customerId') ? localStorage.getItem('customerId') : '';
    if (customerId) {
      const fetchData = async () => {
        try {
          // const res = await CustomerApi.getMyCustomerInfo(); // TODO: fix access token usage
          const res = await CustomerApi.getCustomer(customerId);
          setCustomerInfo(res.body);
        } catch (error) {
          if (error instanceof Error) {
            await message.error(`Failed. ${error.message}`);
          }
        }
      };
      void fetchData();
    }
  }, [isEditCustomerModalOpen]);

  const showEditCustomerModal = () => {
    form.setFieldsValue({
      firstName: customerInfo?.firstName,
      lastName: customerInfo?.lastName,
      birthday: dayjs(customerInfo?.dateOfBirth),
      email: customerInfo?.email,
    });
    setIsEditCustomerModalOpen(true);
  };

  const showChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };

  const logOut = () => {
    CustomerApi.customerLogOut();
    localStorage.removeItem('customerId');
    dispatch(userSlice.actions.setLogInStorage(true));
    navigate('/main');
  };

  return (
    <>
      <Space direction="vertical">
        <h3>Your Profile:</h3>
        <p>
          First Name: <span>{customerInfo?.firstName}</span>
        </p>
        <p>
          Last Name: <span>{customerInfo?.lastName}</span>
        </p>
        <p>
          Date of birth: <span>{customerInfo?.dateOfBirth}</span>
        </p>
      </Space>
      <Space>
        <Button type="primary" onClick={showEditCustomerModal}>
          Edit Profile
        </Button>
        <Button danger onClick={showChangePasswordModal}>
          Change Password
        </Button>
      </Space>
      <Space className={styles.logoutButtonContainer}>
        <Button className={styles.btn} type="primary" htmlType="submit" onClick={logOut}>
          Log Out
        </Button>
      </Space>
      <EditCustomerModal
        isModalOpen={isEditCustomerModalOpen}
        setIsModalOpen={setIsEditCustomerModalOpen}
        form={form}
        customerInfo={customerInfo}
      />
      <ChangePasswordModal isModalOpen={isChangePasswordModalOpen} setIsModalOpen={setIsChangePasswordModalOpen} />
      <Space>
        <AddressCards customerInfo={customerInfo} />
      </Space>
    </>
  );
};

export default Profile;
