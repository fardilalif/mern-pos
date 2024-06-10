import { CiViewList } from "react-icons/ci";
import { FaBox } from "react-icons/fa6";
import { MdQueryStats } from "react-icons/md";

export const navLinks = [
  {
    icon: <FaBox size={25} />,
    text: "Add Product",
    url: "/dashboard/add-product",
  },
  {
    icon: <CiViewList size={25} />,
    text: "View All Sales",
    url: "/dashboard/all-sales",
  },
  {
    icon: <MdQueryStats size={25} />,
    text: "Stats",
    url: "/dashboard/stats",
  },
];
