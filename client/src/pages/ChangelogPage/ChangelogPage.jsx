import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  deleteChangelog as apiDeleteChangelog,
  fetchChangelogByVer,
} from "../../api/changelogs";

import useAuth from "../../hooks/useAuth";

import ChangelogView from "../../components/ChangelogView/ChangelogView";

import styles from "./ChangelogPage.module.scss";

const ChangelogPage = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["changelog", id],
    queryFn: () => fetchChangelogByVer(id),
  });
  const { isAdmin, isLogin, loading } = useAuth();

  const navigate = useNavigate();

  const {
    mutate: deleteChangelog,
    data: deleted,
    isLoading,
  } = useMutation({
    mutationFn: (id) => apiDeleteChangelog(id),
    mutationKey: ["delete-changelog"],
    onSuccess: () => navigate("/changelogs"),
  });

  return (
    <div className={`container ${styles["changelog-page"]}`}>
      <ChangelogView data={data} />
      {isLogin && isAdmin && !loading && (
        <div>
          <Link to={`/changelogs/edit/${id}`}>Edit</Link>
          <button onClick={() => deleteChangelog(data?._id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ChangelogPage;
