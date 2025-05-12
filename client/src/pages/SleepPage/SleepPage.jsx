import SleepTimer from "../../components/SleepTimer/SleepTimer";
import { changeDocumentTitle } from "../../utils/changeDocumentTitle";

import styles from "./SleepPage.module.scss";

const SleepPage = () => {
  changeDocumentTitle("Sleep");

  return (
    <div className={`container ${styles["sleep-page"]}`}>
      <SleepTimer />
    </div>
  );
};

export default SleepPage;
