import { GithubOutlined } from '@ant-design/icons';

import styles from './mentorCard.module.css';
import { type MemberData } from '../aboutUsData';

const mentorCard = (props: MemberData) => {
  return (
    <div className={styles.mentor}>
      <div className={styles.mentorName}>{props.name}</div>
      <img src={props.photo} className={styles.mentorImage} />
      <div className={styles.mentorInfo}>
        <div className={styles.mentorRole}>
          <span style={{fontWeight: 700}}>Role: </span>
          {props.role}
        </div>
        <div className={styles.mentorBio}>
          <span style={{fontWeight: 700}}>Bio: </span>
          {props.bio}
        </div>
        <div className={styles.mentorLinkGitHub}>
          <GithubOutlined />
          <a href={props.link}> GitHub</a>
        </div>
      </div>
    </div>
  );
};

export default mentorCard;
