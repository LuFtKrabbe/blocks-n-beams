import { Customer } from '@commercetools/platform-sdk';
import { Button, Col, Divider, Form, Row, Space, message } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';

import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import CustomerApi from '../../api/customerApi';

import { useAppDispatch } from '../../app/hooks';
import { userSlice } from '../../app/reducers';

import { ChangeAddressForm, ChangePasswordForm, EditCustomerForm } from '../../types';

import AddressCards from './AddressCards/AddressCards';
import AddAddressModal from './modals/AddAddressModal';
import ChangePasswordModal from './modals/ChangePasswordModal';
import EditCustomerModal from './modals/EditCustomerModal';
import styles from './profile.module.css';

const Profile: FC = (): JSX.Element => {
  const [isEditCustomerModalOpen, setIsEditCustomerModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [addressUpdateCounter, setAddressUpdateCounter] = useState(0);
  const [editCustomerForm] = Form.useForm<EditCustomerForm>();
  const [changePasswordForm] = Form.useForm<ChangePasswordForm>();
  const [addAddressForm] = Form.useForm<ChangeAddressForm>();

  const location = useLocation();
  const currentLocationUserId = location.pathname.split('/').pop() as string;

  const [customerInfo, setCustomerInfo] = useState<Customer>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const customerId = localStorage.getItem('customerId') ? localStorage.getItem('customerId') : '';
    if (customerId) {
      const fetchData = async () => {
        try {
          const res = await CustomerApi.getMyCustomerInfo();
          setCustomerInfo(res.body);
        } catch (error) {
          if (error instanceof Error) {
            await message.error(`Failed. ${error.message}`);
          }
        }
      };
      void fetchData();
    }
  }, [isEditCustomerModalOpen, isAddAddressModalOpen]);

  const showEditCustomerModal = () => {
    editCustomerForm.setFieldsValue({
      firstName: customerInfo?.firstName,
      lastName: customerInfo?.lastName,
      birthday: dayjs(customerInfo?.dateOfBirth),
      email: customerInfo?.email,
    });
    setIsEditCustomerModalOpen(true);
  };

  const showAddAddressModal = () => {
    setIsAddAddressModalOpen(true);
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

  if (!localStorage.getItem('customerId') || currentLocationUserId !== localStorage.getItem('customerId')) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <>
      <div className={classNames(styles.customerInfoContainer)}>
        <h3>Your Profile:</h3>
        <Row justify="space-between" gutter={12}>
          <Col className={classNames(styles.customerInfoLabel)}>First Name:</Col>
          <Col>{customerInfo?.firstName}</Col>
        </Row>
        <Row justify="space-between" gutter={12}>
          <Col className={classNames(styles.customerInfoLabel)}>Last Name:</Col>
          <Col>{customerInfo?.lastName}</Col>
        </Row>
        <Row justify="space-between" gutter={12}>
          <Col className={classNames(styles.customerInfoLabel)}>Date of birth:</Col>
          <Col>{customerInfo?.dateOfBirth}</Col>
        </Row>
        <Row justify="space-between" gutter={12}>
          <Col>
            <Button type="primary" onClick={showEditCustomerModal}>
              Edit Profile
            </Button>
          </Col>
          <Col>
            <Button danger onClick={showChangePasswordModal}>
              Change Password
            </Button>
          </Col>
          <Col>
            <Button type="primary" danger onClick={logOut}>
              Log Out
            </Button>
          </Col>
        </Row>
      </div>

      <Divider className={styles.divider}/>

      <Space direction="vertical" className={classNames(styles.addressSectionContainer)}>
        <Space className={classNames(styles.addressSectionControls)}>
          <Button type="primary" onClick={showAddAddressModal}>
            + Add Address
          </Button>
        </Space>
        <AddressCards
          customerInfo={customerInfo}
          setCustomerInfo={setCustomerInfo}
          addressUpdateCounter={addressUpdateCounter}
          setAddressUpdateCounter={setAddressUpdateCounter}
        />
      </Space>

      <EditCustomerModal
        isModalOpen={isEditCustomerModalOpen}
        setIsModalOpen={setIsEditCustomerModalOpen}
        form={editCustomerForm}
        customerInfo={customerInfo}
      />
      <ChangePasswordModal
        isModalOpen={isChangePasswordModalOpen}
        setIsModalOpen={setIsChangePasswordModalOpen}
        form={changePasswordForm}
        customerInfo={customerInfo}
      />
      <AddAddressModal
        isAddAddressModalOpen={isAddAddressModalOpen}
        setIsAddAddressModalOpen={setIsAddAddressModalOpen}
        form={addAddressForm}
        customerInfo={customerInfo}
      />
    </>
  );
};

export default Profile;
