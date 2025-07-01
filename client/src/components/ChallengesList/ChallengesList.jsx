import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getChallengesByUser } from "../../api/challenges";

import ActiveChallengesList from "./ActiveChallengesList/ActiveChallengesList";
import ChallengesListItem from "./ChallengesListItem/ChallengesListItem";
import Loader from "../Loader/Loader";

import styles from "./ChallengesList.module.scss";

const ChallengesList = () => {
  const [activeChallenges, setActiveChallenges] = useState([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["challenges"],
    queryFn: () => getChallengesByUser(),
  });

  useEffect(() => {
    if (data) {
      setActiveChallenges(data.filter((el) => el.isStarted));
    }
  }, [data]);

  return (
    <div className={styles["challenges-list-container"]}>
      {isLoading && <Loader />}
      {!isLoading && isError && <p>Error: {error.message}</p>}
      {!isLoading && !isError && data && (
        <>
          {activeChallenges.length > 0 && (
            <>
              <p>Active challenges</p>
              <ul className={styles["challenges-list"]}>
                <ActiveChallengesList data={activeChallenges} />
              </ul>
            </>
          )}
          <p>All challenges</p>
          <ul className={styles["challenges-list"]}>
            <ChallengesListItem.CreateNew />
            {data?.map((el) => (
              <ChallengesListItem key={el._id} data={el} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ChallengesList;
