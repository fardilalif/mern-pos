import { FaAlignLeft } from "react-icons/fa";
import { useDashboardContext } from "./../pages/DashboardLayout";
import { Button } from "./ui/button.jsx";

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();
  return (
    <nav className="h-[4rem] flex justify-center items-center shadow-lg bg-primary">
      <div className="flex justify-between items-center w-full">
        <Button
          variant="ghost"
          className="justify-start hover:bg-transparent hover:scale-150"
          onClick={toggleSidebar}
        >
          <FaAlignLeft className=" text-2xl text-primary-foreground" />
        </Button>
      </div>
    </nav>
  );
};
export default Navbar;
