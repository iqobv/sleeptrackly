import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";

import { setUserId } from "../reducers/slices/userSlice";

import styles from "./Layout.module.scss";

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserId("681cddabf1378fbefb2337e4"));
  }, [dispatch]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
