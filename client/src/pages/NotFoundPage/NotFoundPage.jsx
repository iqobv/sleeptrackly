import { Link } from "react-router-dom";

import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  return (
    <div className={`container ${styles["not-found-page"]}`}>
      <h2>Page not found</h2>
      <p>404</p>
      <Link to='/'>Home</Link>
    </div>
  );
};

export default NotFoundPage;
