import { useSelector } from "react-redux";
import { useTimer } from "../../hooks/useTimer";

import styles from "./SleepTimer.module.scss";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SleepTimer = () => {
  const { timer, isSleeping, startTimer, stopTimer } = useTimer();
  const { user, isLogin, checkAuth } = useAuth();

  const navigate = useNavigate();

  // const { user, isLogin } = useSelector((state) => state.user);

  const handleContolTimer = () => {
    checkAuth();

    if (!isLogin) {
      navigate("/login");
      return;
    }

    isSleeping ? stopTimer() : startTimer();
  };

  return (
    <div className={styles["sleep-timer"]}>
      <div className={styles["sleep-timer-time"]}>
        {timer.map((time, index) => (
          <span key={index}>{time}</span>
        ))}
      </div>
      <div>
        <button onClick={handleContolTimer}>
          {isSleeping ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default SleepTimer;
