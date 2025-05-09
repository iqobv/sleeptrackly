import React from "react";

import styles from "./SleepPage.module.scss";
import SleepTimer from "../../components/SleepTimer/SleepTimer";

const SleepPage = () => {
  return (
    <div className={`container ${styles["sleep-page"]}`}>
      <SleepTimer />
    </div>
  );
};

export default SleepPage;
