import { RouterProvider, createBrowserRouter } from "react-router-dom";

// pages
import {
  AddProduct,
  AllSales,
  DashboardLayout,
  EditProduct,
  Error,
  HomeLayout,
  Landing,
  Login,
  Products,
  Register,
  Stats,
  Transaction,
} from "./pages/index.js";

// action
import { action as loginAction } from "./pages/Login.jsx";
import { action as productsAction } from "./pages/Products.jsx";
import { action as registerAction } from "./pages/Register.jsx";

// loader
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { loader as allSalesLoader } from "./pages/AllSales.jsx";
import { loader as dashboardLoader } from "./pages/DashboardLayout.jsx";
import { loader as productsLoader } from "./pages/Products.jsx";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});

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
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <Products />,
            loader: productsLoader,
            action: productsAction,
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
          {
            path: "all-sales",
            element: <AllSales />,
            loader: allSalesLoader,
          },
          {
            path: "stats",
            element: <Stats />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
