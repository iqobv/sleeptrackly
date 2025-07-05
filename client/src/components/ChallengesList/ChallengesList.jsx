import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { getChallengesByUser } from "../../api/challenges";

import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import ActiveChallengesList from "./ActiveChallengesList/ActiveChallengesList";
import ChallengesListItem from "./ChallengesListItem/ChallengesListItem";

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
              <h2>Active Challenges</h2>
              <ul className={styles["challenges-list"]}>
                <ActiveChallengesList data={activeChallenges} />
              </ul>
            </>
          )}
          <h2>Created Challenges</h2>
          <ul className={styles["challenges-list"]}>
            {data?.map((el) => (
              <ChallengesListItem key={el._id} data={el} />
            ))}
          </ul>
          <div className={styles["challenges-list-create-challenge"]}>
            <Button isLink to="/challenges/new" color="secondary">
              Create Challenge
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChallengesList;
