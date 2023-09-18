import styles from './intro.module.css';

const intro = () => {
  return (
    <div className={styles.intro}>
      <p className={styles.introTitle}>About us</p>
      <p className={styles.introHello}>Hello everyone!</p>
      <p>Meet our team: mentor and developer group who worked on this final project!</p>
      <p>
        Our team successfully completed the sprints, thanks to the right technology stack, daily diligence and the
        desire to learn something new.
      </p>
      <p>
        Everyone chose a task based on their interests and skills. Modern tools made it possible to coordinate efforts
        and efficiently complete tasks. Helping each other with writing and reviewing code, we handled technical
        requirements and avoided merge conflicts in many cases.
      </p>
      <p>
        We express our gratitude to the mentor for up-to-date educational information, constant willingness to share
        experience and knowledge from commercial development and for active participation in resolving issues while
        working on projects.
      </p>
    </div>
  );
};

export default intro;
