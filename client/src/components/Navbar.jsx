import { GoHome } from "react-icons/go";
import { Link } from "react-router-dom";
import { useDashboardContext } from "./../pages/DashboardLayout";
import NavLinks from "./NavLinks.jsx";

const Navbar = () => {
  const { user } = useDashboardContext();

  return (
    <nav className="h-[4rem] flex justify-center items-center shadow-lg bg-primary sticky top-0 z-10">
      <div className="w-[90%] max-w-screen-xl flex justify-between items-center">
        {/* home button */}
        <Link
          to="/dashboard"
          className="flex items-center cursor-pointer text-primary-foreground text-xl tracking-wider"
        >
          POS <GoHome />
        </Link>

        {/* links */}
        <NavLinks />

        {/* greeting message */}
        <h1 className="text-primary-foreground capitalize font-medium">
          hello, {user?.name}
        </h1>
      </div>
    </nav>
  );
};
export default Navbar;
