import { HomeTwoTone } from '@ant-design/icons';
import { Button } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import styles from './notFound.module.css';

const NotFound: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={classNames(styles.container)}>
      <p className={classNames(styles.title)}>404</p>
      <p>Sorry, but the page</p>
      <p className={classNames(styles.link)}>{location.pathname.split('/').pop()}</p>
      <p>not found!</p>
      <Button
        className={classNames(styles.btn)}
        type="primary"
        onClick={() => {
          navigate('/main');
        }}
      >
        <HomeTwoTone />
        HOME
      </Button>
    </div>
  );
};

export default NotFound;
