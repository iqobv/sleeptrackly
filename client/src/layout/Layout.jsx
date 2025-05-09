import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import Header from "../components/Header/Header";

import styles from "./Layout.module.scss";

const Layout = () => {
  const { checkAuth, user } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [user]);

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
