import SleepChart from "./SleepChart/SleepChart";
import StatByDays from "./StatByDays/StatByDays";
import Stats from "./Stats/Stats";

const SleepStatistics = ({ data }) => {
  const { statistics, days } = data;

  return (
    <div>
      {statistics && <Stats data={statistics} />}
      {days && <SleepChart data={days} />}
      {days && <StatByDays days={days} />}
    </div>
  );
};

export default SleepStatistics;
