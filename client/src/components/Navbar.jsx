import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import customFetch from "@/utils/customFetch.js";
import { ChevronDown, LogOut } from "lucide-react";
import { GoHome } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDashboardContext } from "./../pages/DashboardLayout";
import NavLinks from "./NavLinks.jsx";

const Navbar = () => {
  const { user } = useDashboardContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await customFetch.get("/auth/logout");
    toast.success("Logout successful");
    return navigate("/");
  };

  return (
    <nav className="h-[4rem] flex justify-center items-center shadow-lg bg-primary sticky top-0 z-50">
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-primary-foreground">
              <span className="font-semibold">hello, {user?.name}</span>
              <ChevronDown strokeWidth={3} className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleLogout()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
export default Navbar;
