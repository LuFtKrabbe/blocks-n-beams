import { UserAddOutlined, UserOutlined, HomeOutlined, ShoppingCartOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

import { Dropdown, Space, message } from 'antd';
import Search from 'antd/es/input/Search';
import { Header } from 'antd/es/layout/layout';
import { FC, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import CustomerApi from '../../../api/customerApi';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import { userSlice } from '../../../app/reducers';

import styles from './navbar.module.css';

const Navbar: FC = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState<string>();
  const isLogIn = useAppSelector((state) => state.isLogIn);
  const isLogInStorage = useAppSelector((state) => state.isLogInStorage);
  const customerId = localStorage.getItem('customerId') ? localStorage.getItem('customerId') : '';
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (customerId) {
      const fetchData = async () => {
        const res = await CustomerApi.getCustomer(customerId);
        try {
          setUserName(
            `${res.body.firstName?.charAt(0).toLocaleUpperCase() as string}${
              res.body.lastName?.charAt(0).toLocaleUpperCase() as string
            }`,
          );
        } catch (error) {
          if (error instanceof Error) {
            await message.error(`Failed. ${error.message}`);
          }
        }
      };
      void fetchData();
    }
  }, [isLogIn]);

  const items: MenuProps['items'] = [
    {
      label: <Link to={'/login'}>Login</Link>,
      key: 'login',
      icon: <UserOutlined />,
    },
    {
      label: <Link to={'/registration'}>Registration</Link>,
      key: 'registration',
      icon: <UserAddOutlined />,
    },
  ];

  const loggedInItems: MenuProps['items'] = [
    {
      label: <Link to={'/profile'}>Profile</Link>,
      key: 'login',
      icon: <UserOutlined />,
    },
    {
      label: 'Logout',
      key: 'logout',
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'logout') {
      CustomerApi.customerLogOut(); // TODO: move all that code to one function that will properly logout
      localStorage.removeItem('customerId');
      dispatch(userSlice.actions.setLogInStorage(true));
      navigate('/main');
    }
    setOpen(false);
  };

  const handleOpenChange = (flag: boolean) => {
    setOpen(flag);
  };
  const onSearch = (value: string) => console.log(value);

  return (
    <Header className={styles.header}>
      <NavLink to="/main">
        <HomeOutlined style={{ fontSize: '24px' }} />
      </NavLink>

      <div className={styles.auth}>
        <Search placeholder="input search text" style={{ width: '80%' }} onSearch={onSearch} enterButton />
        <NavLink to="/cart">
          <ShoppingCartOutlined style={{ fontSize: '28px' }} />
        </NavLink>
        {(customerId && isLogIn) || customerId || (customerId && isLogInStorage) ? (
          <Dropdown
            menu={{
              items: loggedInItems,
              onClick: handleMenuClick,
            }}
            onOpenChange={handleOpenChange}
            open={open}
          >
            <NavLink to="/profile">
              <div className={styles.userName}>{userName}</div>
            </NavLink>
          </Dropdown>
        ) : (
          <Dropdown
            menu={{
              items,
              onClick: handleMenuClick,
            }}
            onOpenChange={handleOpenChange}
            open={open}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <UserOutlined style={{ fontSize: '24px' }} />
              </Space>
            </a>
          </Dropdown>
        )}
      </div>
    </Header>
  );
};

export default Navbar;
