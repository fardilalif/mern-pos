import { RouterProvider, createBrowserRouter } from "react-router-dom";

// pages
import {
  DashboardLayout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Products,
  ProductsDetail,
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
import { loader as dashboardLoader } from "./pages/DashboardLayout.jsx";
import { loader as productsLoader } from "./pages/Products.jsx";
import { loader as allProductsLoader } from "./pages/ProductsDetail.jsx";
import { loader as allSalesLoader } from "./pages/Stats.jsx";

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
            path: "products-detail",
            element: <ProductsDetail />,
            loader: allProductsLoader,
          },
          {
            path: "transaction",
            element: <Transaction />,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: allSalesLoader,
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
