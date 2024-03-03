import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, NavLink } from "react-router-dom";
import { useDashboardContext } from "./../pages/DashboardLayout";

const SidebarComp = () => {
  const { isSidebarOpen } = useDashboardContext();

  return (
    <div className="flex h-full">
      <Sidebar collapsed={isSidebarOpen}>
        <Menu
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`&.active`]: {
                color: "#16A34A",
              },
            },
          }}
        >
          <MenuItem component={<NavLink to="/dashboard/add-product" />}>
            Add Product
          </MenuItem>
          <MenuItem component={<NavLink to="/stats" />}>Stats</MenuItem>
          <MenuItem component={<NavLink to="/e-commerce" />}>
            E-commerce
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};
export default SidebarComp;
