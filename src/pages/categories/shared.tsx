// import { CaretRightFilled } from '@ant-design/icons';
// import { MenuProps } from 'antd';
// import { Link } from 'react-router-dom';

// const items: MenuProps['items'] = [
//   {
//     label: <Link to={'/main/bricks'}>Bricks</Link>,
//     key: 'bricks',
//     icon: <CaretRightFilled />,
//   },
//   {
//     label: <Link to={'/main/aerocrete'}>Aerocrete</Link>,
//     key: 'aerocrete',
//     icon: <CaretRightFilled />,
//   },
//   {
//     label: <Link to={'/main/reinforced-concrete'}>Reinforced concrete</Link>,
//     key: 'reinforced-concrete',
//     icon: <CaretRightFilled />,
//   },
// ];

// export default items;
import { AppstoreOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
// import classNames from 'classnames';
import { Link } from 'react-router-dom';

export const NUMBER_LIMIT = -1;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const items: MenuItem[] = [
  getItem('Blocks', 'sub1', <AppstoreOutlined />, [
    getItem(null, '1', <Link to={'/main/bricks'}>Bricks</Link>),
    getItem(null, '2', <Link to={'/main/aerocrete'}>Aerocrete</Link>),
  ]),
  getItem('Beams', 'sub2', <AppstoreOutlined />, [
    getItem(null, '3', <Link to={'/main/reinforced-concrete'}>Reinforced concrete</Link>),
    getItem(null, '4', <Link to={'/main/timber'}>Timber</Link>),
  ]),
  getItem(<Link to={'/main/aggregates'}>Aggregates</Link>, '5', <AppstoreOutlined />),
];

export const rootSubmenuKeys = ['sub1', 'sub2'];
