import { changeDocumentTitle } from "../../utils/changeDocumentTitle";

import ChallengesList from "../../components/ChallengesList/ChallengesList";

import styles from "./ChallengesPage.module.scss";

const ChallengesPage = () => {
  changeDocumentTitle("Challenges");

  return (
    <div className={`container ${styles["challenges-page"]}`}>
      <ChallengesList />
    </div>
  );
};

export default ChallengesPage;
