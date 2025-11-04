import App from "./App";
import AppLogic from "./Logic.jsx";
import ErrorPage from "./ErrorPage";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLogic defaultSection="home" />, 
    errorElement: <ErrorPage />,
  },
  {
    path: "/:section",
    element: <AppLogic />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
