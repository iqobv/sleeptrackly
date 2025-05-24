import { Link } from "react-router-dom";

import styles from "./ChallengesListItem.module.scss";

const ChallengesListItem = ({ data }) => {
  if (!data) return null;

  return (
    <li className={styles["challenges-list-item"]}>
      <Link
        className={styles["challenges-list-item-link"]}
        to={`/challenges/${data._id}`}>
        {data.title}
      </Link>
    </li>
  );
};

ChallengesListItem.CreateNew = () => (
  <li className={`${styles["challenges-list-item"]} ${styles["create-new"]}`}>
    <Link className={styles["create-new-link"]} to={"/challenges/new"}>
      +
    </Link>
  </li>
);

export default ChallengesListItem;
