import SleepTimer from "../../components/SleepTimer/SleepTimer";

import styles from "./SleepPage.module.scss";

const SleepPage = () => {
  return (
    <div className={`container ${styles["sleep-page"]}`}>
      <SleepTimer />
    </div>
  );
};

export default SleepPage;
