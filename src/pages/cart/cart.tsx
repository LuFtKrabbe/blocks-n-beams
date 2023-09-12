import classNames from 'classnames';
import { FC } from 'react';

import styles from './cart.module.css';

const Cart: FC = (): JSX.Element => {
  return <div className={classNames(styles.container)}>Cart Page</div>;
};

export default Cart;
