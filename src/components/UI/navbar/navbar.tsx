import { UserAddOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import classNames from 'classnames';

import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './navbar.module.css';

const items: MenuProps['items'] = [
  {
    label: <Link to={'/main'}>Main</Link>,
    key: 'main',
    icon: <HomeOutlined />,
  },
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

const itemsMain: MenuProps['items'] = [
  {
    label: <Link to={'/main'}>Main</Link>,
    key: 'main',
    icon: <HomeOutlined />,
  },
];

const Navbar: FC = (): JSX.Element => {
  const location = useLocation();
  const locationPath = location.pathname.split('/').pop();
  return (
    <Menu
      mode="horizontal"
      items={locationPath === 'main' ? items : itemsMain}
      theme="dark"
      className={classNames(styles.menu)}
    />
  );
};

export default Navbar;
