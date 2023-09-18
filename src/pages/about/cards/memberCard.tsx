import { GithubOutlined } from '@ant-design/icons';

import { type MemberData } from '../aboutUsData';

import styles from './memberCard.module.css';

const memberCard = (props: MemberData) => {
  return (
    <div className={styles.member}>
      <img src={props.photo} className={styles.memberImage} />
      <div className={styles.memberInfo}>
        <div className={styles.memberName}>{props.name}</div>
        <div className={styles.memberRole}>
          <span style={{ fontWeight: 700 }}>Role: </span>
          {props.role}
        </div>
        <div className={styles.memberContribution}>
          <span style={{ fontWeight: 700 }}>Contribution: </span>
          {props.contribution}
        </div>
        <div className={styles.memberBio}>
          <span style={{ fontWeight: 700 }}>Bio: </span>
          {props.bio}
        </div>
        <div className={styles.memberLinkGitHub}>
          <GithubOutlined />
          <a href={props.link}> GitHub</a>
        </div>
      </div>
    </div>
  );
};

export default memberCard;
