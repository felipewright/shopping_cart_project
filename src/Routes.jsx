import App from "./App";
import ErrorPage from "./ErrorPage";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App defaultSection="home" />, 
    errorElement: <ErrorPage />,
  },
  {
    path: "/:section",
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
