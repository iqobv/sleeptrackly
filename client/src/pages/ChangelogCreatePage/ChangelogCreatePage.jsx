import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchChangelogByVer } from "../../api/changelogs";

import ChangelogEditor from "../../components/ChangelogEditor/ChangelogEditor";

import styles from "./ChangelogCreatePage.module.scss";

const ChangelogCreatePage = ({ isEditMode = false }) => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["changelog", id],
    queryFn: () => fetchChangelogByVer(id),
    enabled: isEditMode && !!id,
  });

  return (
    <div className={`container ${styles["changelog-create-page"]}`}>
      <ChangelogEditor isEdit={isEditMode} data={data} />
    </div>
  );
};

export default ChangelogCreatePage;
