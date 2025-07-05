import { changeDocumentTitle } from "../../utils/changeDocumentTitle";

import ChallengesList from "../../components/ChallengesList/ChallengesList";
import PageHeader from "../../components/PageHeader/PageHeader";

const ChallengesPage = () => {
  changeDocumentTitle("Challenges");

  return (
    <div className={`container page`}>
      <PageHeader
        title={"My Challenges"}
        description={"Track and manage your personal sleep challenges."}
      />
      <ChallengesList />
    </div>
  );
};

export default ChallengesPage;
