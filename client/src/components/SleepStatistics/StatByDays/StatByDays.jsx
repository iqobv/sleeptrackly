import dayjs from "dayjs";

import { formatTime } from "../../../utils/formatTime";

import styles from "./StatByDays.module.scss";

const StatByDays = ({ days }) => {
  return (
    <div className={styles["stat-by-days"]}>
      <ul className={styles["stat-by-days-list"]}>
        {days.map((el) => (
          <li key={el.day} className={styles["stat-by-days-item"]}>
            <div className={styles["stat-by-days-item-date"]}>
              <p>{dayjs(el.day).format("dddd")} </p>
              <p>{dayjs(el.day).format("DD.MM.YYYY")}</p>
            </div>
            {!el?.data ? (
              <p>No info</p>
            ) : (
              <div>
                <p>
                  Sleep duration:{" "}
                  {el.data
                    ? formatTime(el.data?.sleepDuration).join(":")
                    : "00:00:00"}
                </p>
                <p>
                  Sleep start:{" "}
                  {dayjs(el.data?.sleepStart?.localeDate).format(
                    "DD.MM.YYYY HH:mm:ss"
                  )}
                </p>
                <p>
                  Sleep end:{" "}
                  {dayjs(el.data?.sleepEnd?.localeDate).format(
                    "DD.MM.YYYY HH:mm:ss"
                  )}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatByDays;
