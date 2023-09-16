import { Content } from 'antd/es/layout/layout';
import { FC } from 'react';

import { elena, alexander, sergey, andrei } from './aboutUsData';
import logo from '../../assets/rsschool.svg';

import styles from './aboutUs.module.css';

import mentorCard from './cards/mentorCard';
import memberCard from './cards/memberCard';

const AboutUs: FC = (): JSX.Element => {
  return (
    <Content className={styles.layoutWrapper}>
      <div className={styles.aboutUsWrapper}>
        <div className={styles.aboutUs}>
          <div>Hello! Let us introduce to you our team!</div>
          {mentorCard(elena)}
          <div className={styles.teamInfo}>
            <a href="https://rs.school/" className={styles.logoLink}>
              <object type="image/svg+xml" data={logo} className={styles.logo} />
            </a>
          </div>
        </div>
        <div className={styles.teamMembers}>
          {memberCard(alexander)}
          {memberCard(sergey)}
          {memberCard(andrei)}
        </div>
      </div>
    </Content>
  );
};

export default AboutUs;
