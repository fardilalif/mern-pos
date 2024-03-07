import { Button } from "@/components/ui/button.jsx";
import { CiLogout } from "react-icons/ci";
import { Link, NavLink, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { navLinks } from "./../constant";
import { useDashboardContext } from "./../pages/DashboardLayout";
import customFetch from "./../utils/customFetch";

const SidebarComp = () => {
  const { isSidebarOpen } = useDashboardContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await customFetch.get("/auth/logout");
    toast.success("Logout successful");
    return navigate("/");
  };

  return (
    <aside
      className={` ${
        isSidebarOpen ? "w-72" : "w-20"
      } min-h-screen h-full p-5 shadow-lg transition-all duration-300`}
    >
      <div
        className={`fixed top-0 left-0 h-screen flex flex-col items-center justify-between gap-y-4 py-8 px-4 transition-all duration-500 ${
          isSidebarOpen ? "w-72" : "w-20"
        }`}
      >
        <div className="flex flex-col items-center">
          <Button
            asChild
            variant="ghost"
            className={`font-bold tracking-widest text-primary transition-all duration-150  ${
              isSidebarOpen ? "text-4xl" : "text-2xl"
            }`}
          >
            <Link to="/dashboard">POS</Link>
          </Button>
          <div className="pt-6 flex flex-col gap-y-4 text-xl ">
            {navLinks.map((link) => {
              return (
                <NavLink
                  key={link.text}
                  to={link.url}
                  className={`flex items-center gap-x-4 w-full cursor-pointer hover:text-primary transition-all duration-200 [&.active]:text-primary ${
                    isSidebarOpen && "hover:translate-x-4"
                  }`}
                >
                  <span>{link.icon}</span>
                  <span className={` ${!isSidebarOpen && "hidden"} `}>
                    {link.text}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center border-t-2 border-primary p-4 w-full">
          {isSidebarOpen ? (
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <CiLogout
              onClick={handleLogout}
              size={25}
              className={`hover:text-primary  transition-all duration-200 ${
                isSidebarOpen && "hover:translate-x-4"
              }`}
            />
          )}
        </div>
      </div>
    </aside>
  );
};
export default SidebarComp;
