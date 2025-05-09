import React, { useEffect, useState } from "react";

import styles from "./StatisticsPage.module.scss";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getStatisticsByWeekForUser } from "../../api/statistics";
import SleepStatistics from "../../components/SleepStatistics/SleepStatistics";

const StatisticsPage = () => {
  const { userId } = useSelector((state) => state.user);
  const [week, setWeek] = useState(0);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["sleeps", userId, week],
    queryFn: () => getStatisticsByWeekForUser(userId, week),
    enabled: !!userId,
  });

  const handlePrevWeek = () =>
    setWeek((w) => (w < data.totalWeeks - 1 ? w + 1 : w));
  const handleNextWeek = () => setWeek((w) => (w === 0 ? w : w - 1));

  return (
    <div className={`container`}>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handlePrevWeek}>Попередній тиждень</button>
        <button onClick={handleNextWeek}>Наступний тиждень</button>
        <span style={{ marginLeft: "1rem" }}>
          Тиждень: {data?.statistics?.weekNumber || 0}
        </span>
      </div>

      {isLoading && <p>Завантаження...</p>}
      {error && <p>Помилка: {error.message}</p>}

      {data && (
        <>
          <SleepStatistics data={data} />
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default StatisticsPage;
