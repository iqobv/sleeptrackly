import React, { useEffect } from "react";

import styles from "./SleepStatistics.module.scss";
import SleepChart from "./SleepChart/SleepChart";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../../api/auth";

const SleepStatistics = ({ data }) => {
  const { statistics, days } = data;

  return <div>{days && <SleepChart data={days} />}</div>;
};

export default SleepStatistics;
