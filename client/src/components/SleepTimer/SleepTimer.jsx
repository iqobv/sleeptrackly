import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTimer } from "../../hooks/useTimer";
import useAuth from "../../hooks/useAuth";

import EndSleep from "./EndSleep/EndSleep";

import styles from "./SleepTimer.module.scss";

const SleepTimer = () => {
  const { timer, isSleeping, sleepFinished, startTimer, stopTimer } =
    useTimer();
  const { isLogin, checkAuth } = useAuth();
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleShowTimer = () => setShow(isSleeping);

  const handleContolTimer = () => {
    checkAuth();

    if (!isLogin) {
      navigate("/login");
      return;
    }

    isSleeping ? stopTimer() : startTimer();
  };

  useEffect(() => {
    handleShowTimer();
  }, [isSleeping]);

  return (
    <div className={styles["sleep-timer"]}>
      <div
        className={`${styles["sleep-timer-time"]} ${show ? styles.show : ""}`}>
        {timer.map((time, index) => (
          <span key={index}>{time}</span>
        ))}
      </div>
      {Object.keys(sleepFinished).length > 0 && (
        <EndSleep data={sleepFinished} />
      )}
      <div className={styles["sleep-timer-control"]}>
        <button
          onClick={handleContolTimer}
          className={styles["sleep-timer-button"]}>
          {isSleeping ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default SleepTimer;
