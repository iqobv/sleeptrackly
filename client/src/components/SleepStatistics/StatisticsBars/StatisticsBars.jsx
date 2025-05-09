import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import styles from "./StatisticsBars.module.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const StatisticsBars = () => {
  return <div>StatisticsBars</div>;
};

export default StatisticsBars;
