import { CaretRightFilled } from '@ant-design/icons';
import { MenuProps } from 'antd';
import { Link } from 'react-router-dom';

const items: MenuProps['items'] = [
  {
    label: <Link to={'/main/square'}>Square</Link>,
    key: 'square',
    icon: <CaretRightFilled />,
  },
  {
    label: <Link to={'/main/circle'}>Circle</Link>,
    key: 'circle',
    icon: <CaretRightFilled />,
  },
  {
    label: <Link to={'/main/delta'}>Delta</Link>,
    key: 'delta',
    icon: <CaretRightFilled />,
  },
];

export default items;
