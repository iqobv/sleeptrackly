import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import dayjs from "dayjs";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

import { colorize } from "../../../utils/colorize";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SleepChart = ({ data }) => {
  const labels = data?.map((item) => dayjs(item.day).format("dddd"));
  const durations = data?.map((item) =>
    item.data ? (item.data.sleepDuration / 60 / 60).toFixed(1) : 0
  );
  const { theme } = useSelector((state) => state.theme);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Sleep duration (hours)",
        data: durations,
        backgroundColor: colorize(false, theme),
        borderColor: colorize(true, theme),
        borderRadius: 6,
        borderWidth: 3,
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
        min: 0,
        title: { display: true, text: "Hours" },
        grid: {
          color: theme === "dark" ? "#444" : "#ccc",
        },
      },
      x: {
        title: { display: true, text: "Day" },
        grid: {
          color: theme === "dark" ? "#444" : "#ccc",
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default SleepChart;
