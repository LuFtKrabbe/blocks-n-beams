import { FC } from 'react';

import styles from './aboutUs.module.css';
import { elena, alexander, sergey, andrei } from './aboutUsData';

import memberCard from './cards/memberCard';
import mentorCard from './cards/mentorCard';
import intro from './intro/intro';
import schoolInfo from './schoolInfo/schoolInfo';

const AboutUs: FC = (): JSX.Element => {
  return (
    <div className={styles.layoutWrapper}>
      <div className={styles.aboutUsWrapper}>
        <div className={styles.aboutUs}>
          {intro()}
          {mentorCard(elena)}
          {schoolInfo()}
        </div>
        <div className={styles.team}>
          <div className={styles.title}>Developer team</div>
          {memberCard(alexander)}
          {memberCard(sergey)}
          {memberCard(andrei)}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
