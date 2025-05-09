import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "../layout/Layout";

const MainPage = lazy(() => import("../pages/MainPage/MainPage"));
const SleepPage = lazy(() => import("../pages/SleepPage/SleepPage"));
const ChallangesPage = lazy(() =>
  import("../pages/ChallangesPage/ChallangesPage")
);
const StatisticsPage = lazy(() =>
  import("../pages/StatisticsPage/StatisticsPage")
);

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
        element: <StatisticsPage />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
