import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar, SidebarComp } from "../components/index.js";

const DashboardContext = createContext();

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <DashboardContext.Provider value={{ toggleSidebar, isSidebarOpen }}>
        <section>
          <main className="grid grid-cols-[auto_1fr]">
            <SidebarComp />
            <div>
              <Navbar />
              <Outlet />
            </div>
          </main>
        </section>
      </DashboardContext.Provider>
    </>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
