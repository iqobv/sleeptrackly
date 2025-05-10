import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { getStatisticsByWeekForUser } from "../../api/statistics";

import SleepStatistics from "../../components/SleepStatistics/SleepStatistics";
import WeekPagination from "../../components/WeekPagination/WeekPagination";

import styles from "./StatisticsPage.module.scss";

const StatisticsPage = () => {
  const { userId } = useSelector((state) => state.user);
  const [week, setWeek] = useState(0);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["sleeps", userId, week],
    queryFn: () => getStatisticsByWeekForUser(userId, week),
    enabled: !!userId,
  });

  return (
    <div className={`container ${styles["statistics-page"]}`}>
      {data && (
        <WeekPagination
          setWeek={setWeek}
          totalWeeks={data.totalWeeks}
          days={data.days}
          week={week}
        />
      )}

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {data && <SleepStatistics data={data} />}
    </div>
  );
};

export default StatisticsPage;
