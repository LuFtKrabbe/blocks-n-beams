import { GroupOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';

import { Link } from 'react-router-dom';

export const NUMBER_LIMIT = -1;

export const PAGE_SIZE: number = 6;

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
  getItem(<Link to={'/main/blocks'}>BLOCKS</Link>, 'blocks', <GroupOutlined />),
  getItem('sections:', 'sub1', null, [
    getItem(null, '1', <Link to={'/main/bricks'}>Bricks</Link>),
    getItem(null, '2', <Link to={'/main/aerocrete'}>Aerocrete</Link>),
  ]),
  getItem(<Link to={'/main/beams'}>BEAMS</Link>, 'beams', <GroupOutlined />),
  getItem('sections:', 'sub2', null, [
    getItem(null, '3', <Link to={'/main/reinforced-concrete'}>Reinforced concrete</Link>),
    getItem(null, '4', <Link to={'/main/timber'}>Timber</Link>),
  ]),
  getItem(<Link to={'/main/aggregates'}>AGGREGATES</Link>, '5', <GroupOutlined />),
];

export const rootSubmenuKeys = ['sub1', 'sub2'];
