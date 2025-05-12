import { useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import styles from "./EndSleep.module.scss";
import { formatTime } from "../../../utils/formatTime";

const EndSleep = ({ data }) => {
  const { sleepDuration, sleepStart, sleepEnd } = data;

  return (
    <div className={styles["end-sleep"]}>
      <p>Your sleep is over</p>
      <p>Your sleep duration: {formatTime(sleepDuration).join(":")}</p>
      <p>
        Tou start sleep at:{" "}
        {dayjs(sleepStart.localeDate).format("DD.MM.YYYY HH:mm:ss")}
      </p>
      <p>
        You slept for {dayjs(sleepEnd.localeDate).format("DD.MM.YYYY HH:mm:ss")}
      </p>
      <Link to='/statistics'>View statistics</Link>
    </div>
  );
};

export default EndSleep;
