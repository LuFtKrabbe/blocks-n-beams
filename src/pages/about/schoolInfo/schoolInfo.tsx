import logo from '../../../assets/rsschool.svg';

import styles from './schoolInfo.module.css';

const schoolInfo = () => {
  return (
    <div className={styles.schoolInfo}>
      <div className={styles.schoolText}>
        Do you want to learn about frontend development and then execute projects like this or many others? Learn the
        framework or node.js?
        <br />
        Join the community and study at RSSchool!
      </div>
      <div className={styles.schoolLogo}>
        <a href="https://rs.school/" className={styles.schoolLogoLink}>
          <object type="image/svg+xml" data={logo} className={styles.schoolLogoSvg} />
        </a>
      </div>
    </div>
  );
};

export default schoolInfo;
