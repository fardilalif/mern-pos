import { CiViewList } from "react-icons/ci";
import { FaBox } from "react-icons/fa6";

export const navLinks = [
  {
    icon: <FaBox size={25} />,
    text: "Add Product",
    url: "/dashboard/add-product",
  },
  {
    icon: <CiViewList size={25} />,
    text: "Stats",
    url: "/dashboard/stats",
  },
];
