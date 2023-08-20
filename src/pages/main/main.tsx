import { Button, Space } from 'antd';
import classNames from 'classnames';
import { FC, useState } from 'react';

import CustomerApi from '../../api/customerApi';
import Navbar from '../../components/UI/navbar/navbar';

import styles from './main.module.css';

const Main: FC = (): JSX.Element => {
  const [showLogout, setShowLogout] = useState(CustomerApi.customerIsLoggedIn());

  const logOut = () => {
    CustomerApi.customerLogOut();
    setShowLogout(false);
  };

  return (
    <>
      <Navbar />
      <div className={classNames(styles.container)}>Main Page</div>
      <Space className={classNames(styles.logoutButtonContainer)}>
        {showLogout && (
          <Button type="primary" danger onClick={logOut}>
            Log out
          </Button>
        )}
      </Space>
    </>
  );
};

export default Main;
