import { UserAddOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import classNames from 'classnames';

import { FC } from 'react';
import { Link } from 'react-router-dom';

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

const Navbar: FC = (): JSX.Element => {
  return (
    <>
      {/* <div className={styles.navbarWrap}>
        <Link to={'/main'}>Main</Link>
        <Link to={'/login'}>Login</Link>
        <Link to={'/registration'}>Registration</Link>
      </div> */}
      <Menu mode="horizontal" items={items} theme="dark" className={classNames(styles.menu)} />
    </>
  );
};

export default Navbar;
