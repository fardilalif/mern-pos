import { RouterProvider, createBrowserRouter } from "react-router-dom";

// pages
import {
  AddProduct,
  DashboardLayout,
  EditProduct,
  Error,
  HomeLayout,
  Landing,
  Login,
  Products,
  Register,
  Transaction,
} from "./pages/index.js";

// action
import { action as loginAction } from "./pages/Login.jsx";
import { action as registerAction } from "./pages/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Products />,
          },
          {
            path: "transaction",
            element: <Transaction />,
          },
          {
            path: "add-product",
            element: <AddProduct />,
          },
          {
            path: "edit-product",
            element: <EditProduct />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
