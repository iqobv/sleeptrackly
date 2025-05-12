import React from "react";

import styles from "./MainPage.module.scss";
import { changeDocumentTitle } from "../../utils/changeDocumentTitle";

const MainPage = () => {
  changeDocumentTitle("Home");

  return <div>MainPage</div>;
};

export default MainPage;
