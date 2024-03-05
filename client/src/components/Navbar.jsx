import { FaAlignLeft } from "react-icons/fa";
import { useDashboardContext } from "./../pages/DashboardLayout";
import { Button } from "./ui/button.jsx";

const Navbar = () => {
  const { user, toggleSidebar } = useDashboardContext();

  return (
    <nav className="h-[4rem] flex justify-center items-center shadow-lg bg-primary sticky top-0 ">
      <div className="w-[90%] max-w-screen-xl flex justify-between items-center">
        <Button
          variant="ghost"
          className="hover:bg-transparent hover:scale-150 transition-transform p-0"
          onClick={toggleSidebar}
        >
          <FaAlignLeft className=" text-2xl text-primary-foreground" />
        </Button>
        <h1 className="capitalize text-primary-foreground font-semibold">
          hello, {user?.name}
        </h1>
      </div>
    </nav>
  );
};
export default Navbar;
