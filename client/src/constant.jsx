import { BiDetail } from "react-icons/bi";
import { CiViewList } from "react-icons/ci";

export const navLinks = [
  {
    icon: <CiViewList size={25} />,
    text: "Stats",
    url: "/dashboard/stats",
  },
  {
    icon: <BiDetail size={25} />,
    text: "Products Detail",
    url: "/dashboard/products-detail",
  },
];
