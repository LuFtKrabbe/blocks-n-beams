import { Content } from 'antd/es/layout/layout';
import { FC } from 'react';

import styles from './aboutUs.module.css';

const AboutUs: FC = (): JSX.Element => {
  return (
    <Content className={styles.layoutWrapper}>
      <Content className={styles.aboutUsWrapper}>ABOUT US</Content>
    </Content>
  );
};

export default AboutUs;
