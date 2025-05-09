import { useTimer } from "../../hooks/useTimer";

import styles from "./SleepTimer.module.scss";

const SleepTimer = () => {
  const { timer, isSleeping, startTimer, stopTimer } = useTimer();

  const handleContolTimer = () => {
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
        {/* <button onClick={startTimer}>Start</button> */}
        {/* <button onClick={stopTimer}>Stop</button> */}
        <button onClick={handleContolTimer}>
          {isSleeping ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default SleepTimer;
