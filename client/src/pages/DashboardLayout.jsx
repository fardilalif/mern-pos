import { createContext, useContext } from "react";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { Loading, Navbar } from "../components/index.js";
import customFetch from "./../utils/customFetch";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    console.log(error);
    return redirect("/");
  }
};

const DashboardContext = createContext();

const DashboardLayout = () => {
  const { user } = useLoaderData();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      <DashboardContext.Provider value={{ user }}>
        <section>
          <main>
            <Navbar />
            <div className="w-11/12 max-w-screen-xl mx-auto py-6">
              {isLoading ? <Loading /> : <Outlet />}
            </div>
          </main>
        </section>
      </DashboardContext.Provider>
    </>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
