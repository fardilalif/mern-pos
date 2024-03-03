import { CiLogout } from "react-icons/ci";
import { FaBox } from "react-icons/fa6";
import { MdQueryStats } from "react-icons/md";
export const navLinks = [
  {
    icon: <FaBox size={20} />,
    text: "add product",
  },
  {
    icon: <MdQueryStats size={20} />,
    text: "stats",
  },
  {
    icon: <CiLogout size={20} />,
    text: "logout",
  },
];
