import dayjs from "dayjs";

import Button from "../../Button/Button";

import { formatTime } from "../../../utils/formatTime";
import styles from "./EndSleep.module.scss";

const EndSleep = ({ data }) => {
  const { sleepDuration, sleepStart, sleepEnd } = data;

  return (
    <div className={styles["end-sleep"]}>
      <p>Your sleep duration: {formatTime(sleepDuration).join(":")}</p>
      <p>
        Started at: {dayjs(sleepStart.localeDate).format("DD.MM.YYYY HH:mm:ss")}
      </p>
      <p>
        Ended at: {dayjs(sleepEnd.localeDate).format("DD.MM.YYYY HH:mm:ss")}
      </p>
      <Button isLink to="/dashboard" style={{ marginTop: "20px" }}>
        View Statistics
      </Button>
    </div>
  );
};

export default EndSleep;
