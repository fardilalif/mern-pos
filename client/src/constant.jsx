import { CiViewList } from "react-icons/ci";
import { FaBox } from "react-icons/fa6";
import { MdQueryStats } from "react-icons/md";

export const navLinks = [
  {
    icon: <FaBox size={20} />,
    text: "Add Product",
    url: "/dashboard/add-product",
  },
  {
    icon: <CiViewList size={20} />,
    text: "View All Sales",
    url: "/dashboard/all-sales",
  },
  {
    icon: <MdQueryStats size={20} />,
    text: "Stats",
    url: "/dashboard/stats",
  },
];
