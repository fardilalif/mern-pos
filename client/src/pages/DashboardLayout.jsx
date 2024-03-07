import { createContext, useContext, useState } from "react";
import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { Navbar, SidebarComp } from "../components/index.js";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useLoaderData();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <DashboardContext.Provider value={{ user, toggleSidebar, isSidebarOpen }}>
        <section>
          <main className="grid grid-cols-[auto_1fr]">
            <SidebarComp />
            <div>
              <Navbar />
              <div className="grid min-h-[calc(100vh-4rem)] w-[90%] max-w-screen-xl mx-auto py-6">
                <Outlet />
              </div>
            </div>
          </main>
        </section>
      </DashboardContext.Provider>
    </>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
