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
              <p className={styles["stat-by-days-item-date-day"]}>
                {dayjs(el.day).format("dddd")}{" "}
              </p>
              <p>{dayjs(el.day).format("DD.MM.YYYY")}</p>
            </div>
            {!el?.data ? (
              <p>No info</p>
            ) : (
              <div className={styles["stat-by-days-item-info"]}>
                <div className={styles["stat-by-days-item-info-item"]}>
                  Sleep duration:
                  <p className={styles["stat-by-days-item-info-item-data"]}>
                    {el.data
                      ? formatTime(el.data?.sleepDuration).join(":")
                      : "00:00:00"}
                  </p>
                </div>
                <div className={styles["stat-by-days-item-info-item"]}>
                  Sleep start:
                  <p className={styles["stat-by-days-item-info-item-data"]}>
                    {dayjs(el.data?.sleepStart?.localeDate).format(
                      "DD.MM.YYYY HH:mm:ss"
                    )}
                  </p>
                </div>
                <div className={styles["stat-by-days-item-info-item"]}>
                  Sleep end:
                  <p className={styles["stat-by-days-item-info-item-data"]}>
                    {dayjs(el.data?.sleepEnd?.localeDate).format(
                      "DD.MM.YYYY HH:mm:ss"
                    )}
                  </p>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatByDays;
