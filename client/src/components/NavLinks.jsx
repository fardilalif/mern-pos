import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navLinks } from "@/constant.jsx";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {navLinks.map((link) => {
            return (
              <NavLink
                key={link.text}
                to={link.url}
                className={`bg-transparent text-primary-foreground font-medium ${navigationMenuTriggerStyle()}`}
                style={({ isActive }) => {
                  return {
                    background: isActive ? "white" : "none",
                    color: isActive ? "black" : "white",
                  };
                }}
              >
                {link.text}
              </NavLink>
            );
          })}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default NavLinks;
