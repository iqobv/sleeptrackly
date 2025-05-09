import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import dayjs from "dayjs";

import styles from "./SleepChart.module.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SleepChart = ({ data }) => {
  const labels = data.map((item) => dayjs(item.day).format("dddd"));
  const durations = data.map((item) =>
    item.data ? (item.data.sleepDuration / 60 / 60).toFixed(1) : 0
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Sleep duration (hours)",
        data: durations,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} h`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Hours" },
      },
      x: {
        title: { display: true, text: "Day" },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default SleepChart;
