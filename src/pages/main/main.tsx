import { FC } from 'react';

import Navbar from '../../components/UI/navbar/navbar';

import styles from './main.module.css';

const Main: FC = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>Main Page</div>;
    </>
  );
};

export default Main;
