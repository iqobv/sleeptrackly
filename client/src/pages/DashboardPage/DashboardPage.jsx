import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getStatisticsByWeekForUser } from "../../api/statistics";

import SleepStatistics from "../../components/SleepStatistics/SleepStatistics";
import WeekPagination from "../../components/WeekPagination/WeekPagination";

import Loader from "../../components/Loader/Loader";
import useAuth from "../../hooks/useAuth";
import { changeDocumentTitle } from "../../utils/changeDocumentTitle";

import styles from "./DashboardPage.module.scss";

const DashboardPage = () => {
  const { isLogin, userId } = useAuth();

  const [week, setWeek] = useState(0);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["sleeps", userId, week],
    queryFn: () => getStatisticsByWeekForUser(week),
    enabled: !!isLogin,
  });

  changeDocumentTitle("Statistics");

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

      {isLoading && (
        <div style={{ marginTop: "50px" }}>
          <Loader />
        </div>
      )}
      {error && <p>Error: {error.message}</p>}

      {data && <SleepStatistics data={data} />}
    </div>
  );
};

export default DashboardPage;
