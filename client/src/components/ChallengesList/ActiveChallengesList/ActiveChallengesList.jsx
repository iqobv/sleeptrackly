import ChallengesListItem from "../ChallengesListItem/ChallengesListItem";

import defaultStyles from "../ChallengesList.module.scss";
import styles from "./ActiveChallengesList.module.scss";

const ActiveChallengesList = ({ data }) => {
  return (
    <>
      {data?.map((el) => (
        <ChallengesListItem data={el} key={el._id} />
      ))}
    </>
  );
};

export default ActiveChallengesList;
