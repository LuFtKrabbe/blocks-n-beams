/* eslint-disable @typescript-eslint/naming-convention */
import {
  UserAddOutlined,
  UserOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  EuroCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

import type { MenuProps } from 'antd';

import { Button, Dropdown, Select, Space, message } from 'antd';
import Search from 'antd/es/input/Search';
import { Header } from 'antd/es/layout/layout';
import { FC, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

// import ProductApi from '../../../api/Product';
import CustomerApi from '../../../api/customerApi';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import { setQueryArgs } from '../../../app/productsListSlice';
import { userSlice } from '../../../app/reducers';
import AbouUsIcon from '../../../assets/aboutUsIcon';

import logo from './../../../assets/logo.png';

import styles from './navbar.module.css';

const Navbar: FC = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState<string>();
  const isLogIn = useAppSelector((state) => state.user.isLogIn);
  const isLogInStorage = useAppSelector((state) => state.user.isLogInStorage);
  const customerId = localStorage.getItem('customerId') ? localStorage.getItem('customerId') : '';
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { queryArgs } = useAppSelector((state) => state.productsSearch);
  const { Option } = Select;

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
      label: <Link to={customerId ? `/profile/${customerId}` : `/login`}>Profile</Link>,
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
  const onSearch = (text: string) => {
    dispatch(setQueryArgs({ ...queryArgs, 'text.en-US': text })); // my
  };

  const handleChange = (value: string) => {
    switch (value) {
      case 'name-asc':
        dispatch(setQueryArgs({ ...queryArgs, sort: 'name.en-US asc' }));
        break;
      case 'name-desc':
        dispatch(setQueryArgs({ ...queryArgs, sort: 'name.en-US desc' }));
        break;
      case 'price-asc':
        dispatch(setQueryArgs({ ...queryArgs, sort: 'price asc' }));
        break;
      case 'price-desc':
        dispatch(setQueryArgs({ ...queryArgs, sort: 'price desc' }));
        break;
      default:
        dispatch(setQueryArgs({ ...queryArgs, sort: 'name.en-US desc' }));
        break;
    }
  };

  const handleReset = () => {
    dispatch(setQueryArgs({ limit: 20, fuzzy: true }));
  };

  return (
    <Header className={styles.headerWrapper}>
      <div className={styles.header}>
        <NavLink to="/main" className={styles.logoWrapper} style={{ height: 44 }}>
          <img src={logo} className={styles.logo} style={{ height: 44 }} />
        </NavLink>

        <div className={styles.auth}>
          <div>
            <Select defaultValue="Sorting" style={{ width: 100 }} onChange={handleChange}>
              <Option value="name-asc">
                Name <SortAscendingOutlined />
              </Option>
              <Option value="name-desc">
                Name <SortDescendingOutlined />
              </Option>
              <Option value="price-asc">
                Price <EuroCircleOutlined /> <ArrowUpOutlined />
              </Option>
              <Option value="price-desc">
                Price <EuroCircleOutlined /> <ArrowDownOutlined />
              </Option>
            </Select>
          </div>

          <Search
            placeholder="Search"
            className={styles.searchString}
            onSearch={(value) => void onSearch(value)}
            enterButton
          />

          <Button type="primary" onClick={handleReset}>
            Reset Filter
          </Button>
          <NavLink to="/about-us">
            <AbouUsIcon style={{ fontSize: '25px', margin: '0px 4px' }} />
          </NavLink>
          <NavLink to="/main">
            <ShopOutlined style={{ fontSize: '25px', margin: '0px 4px' }} />
          </NavLink>
          <NavLink to="/cart">
            <ShoppingCartOutlined style={{ fontSize: '28px', margin: '0px 4px' }} />
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
              <NavLink to={`/profile/${customerId}`}>
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
                  <UserOutlined style={{ fontSize: '24px', margin: '0px 4px' }} />
                </Space>
              </a>
            </Dropdown>
          )}
        </div>
      </div>
    </Header>
  );
};

export default Navbar;
