import { Button } from "@/components/ui/button.jsx";
import { CiLogout } from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";
import { navLinks } from "./../constant";
import { useDashboardContext } from "./../pages/DashboardLayout";

const SidebarComp = () => {
  const { isSidebarOpen } = useDashboardContext();

  return (
    <aside
      className={` ${
        isSidebarOpen ? "w-72" : "w-20"
      } bg-secondary min-h-screen h-full p-5 shadow-lg transition-all duration-300`}
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
          <div className="pt-6 flex flex-col gap-y-4 text-xl">
            {navLinks.map((link) => {
              return (
                <NavLink
                  key={link.text}
                  to={link.url}
                  className="flex items-center gap-x-4 cursor-pointer text-secondary-foreground hover:text-primary hover:translate-x-4 transition-all duration-200 [&.active]:text-primary"
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
            <Button variant="outline">Logout</Button>
          ) : (
            <CiLogout
              size={25}
              className="hover:text-primary hover:translate-x-4 transition-all duration-200"
            />
          )}
        </div>
      </div>
    </aside>
  );
};
export default SidebarComp;
