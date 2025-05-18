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
const ChangelogsPage = lazy(() =>
  import("../pages/ChangelogsPage/ChangelogsPage")
);
const ChangelogCreatePage = lazy(() =>
  import("../pages/ChangelogCreatePage/ChangelogCreatePage")
);
const ChangelogPage = lazy(() =>
  import("../pages/ChangelogPage/ChangelogPage")
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
      {
        path: "changelogs",
        element: (
          <PrivateRoute>
            <ChangelogsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "changelogs/:id",
        element: (
          <PrivateRoute>
            <ChangelogPage />
          </PrivateRoute>
        ),
      },
      {
        path: "changelogs/edit/:id",
        element: (
          <PrivateRoute isAdminRoute adminRedirect='/changelogs'>
            <ChangelogCreatePage isEditMode />
          </PrivateRoute>
        ),
      },
      {
        path: "changelogs/new",
        element: (
          <PrivateRoute isAdminRoute adminRedirect='/changelogs'>
            <ChangelogCreatePage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
