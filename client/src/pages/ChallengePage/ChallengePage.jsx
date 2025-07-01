import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { getChallengeById } from "../../api/challenges";

import { changeDocumentTitle } from "../../utils/changeDocumentTitle";

import DatesList from "../../components/DatesList/DatesList";

import NotFoundPage from "../NotFoundPage/NotFoundPage";

import styles from "./ChallengePage.module.scss";
import ChallengeInfo from "../../components/ChallengeInfo/ChallengeInfo";
import ChallengeControl from "../../components/ChallengeControl/ChallengeControl";
import Loader from "../../components/Loader/Loader";

const ChallengePage = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["challenge", id],
    queryFn: () => getChallengeById(id),
    enabled: !!id,
    retry: false,
  });

  if (isError && !isLoading) return <NotFoundPage />;

  useEffect(() => {
    changeDocumentTitle(`Challenge ${data?.title ? `- ${data?.title}` : ""}`);
  }, [data]);

  return (
    <div className={`container ${styles["challenge-page"]}`}>
      {isLoading && <Loader />}
      {data && <ChallengeInfo data={data} />}
      {data && <ChallengeControl challengeId={data?._id} />}
      {!isLoading && data && <DatesList data={data} type={data?.frequency} />}
    </div>
  );
};

export default ChallengePage;
