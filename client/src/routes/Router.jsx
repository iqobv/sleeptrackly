import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "../layout/Layout";
import { PrivateRoute } from "./PrivateRoute";

const MainPage = lazy(() => import("../pages/MainPage/MainPage"));
const SleepPage = lazy(() => import("../pages/SleepPage/SleepPage"));
const ChallangesPage = lazy(() =>
  import("../pages/ChallangesPage/ChallangesPage")
);
const StatisticsPage = lazy(() =>
  import("../pages/StatisticsPage/StatisticsPage")
);
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "sleep",
        element: <SleepPage />,
      },
      {
        path: "challanges",
        element: <ChallangesPage />,
      },
      {
        path: "statistics",
        element: (
          <PrivateRoute>
            <StatisticsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
