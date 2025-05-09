import React from "react";

import styles from "./SleepStatistics.module.scss";
import SleepChart from "./SleepChart/SleepChart";

const SleepStatistics = ({ data }) => {
  const { statistics, days } = data;

  return <div>{days && <SleepChart data={days} />}</div>;
};

export default SleepStatistics;
