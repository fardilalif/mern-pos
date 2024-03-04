import { navLinks } from "./../constant";
import { useDashboardContext } from "./../pages/DashboardLayout";

const SidebarComp = () => {
  const { isSidebarOpen } = useDashboardContext();

  return (
    <aside>
      <div
        className={` ${
          isSidebarOpen ? "w-20" : "w-72"
        } bg-secondary min-h-screen h-full p-5 shadow-lg`}
      >
        <div className="fixed top-0 left-0">
          <div
            className={`h-screen flex flex-col items-center gap-y-4 py-8 px-4 ${
              isSidebarOpen ? "w-20" : "w-72"
            }`}
          >
            <h1
              className={`font-semibold tracking-widest text-primary ${
                isSidebarOpen ? "text-2xl" : "text-4xl"
              }`}
            >
              POS
            </h1>
            <ul className="pt-6">
              {navLinks.map((link) => {
                return (
                  <li
                    key={link.text}
                    className="flex items-center gap-x-4 cursor-pointer hover:text-primary "
                  >
                    <span>{link.icon}</span>
                    <span
                      className={`${
                        isSidebarOpen && "hidden"
                      } origin-left duration-200`}
                    >
                      {link.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default SidebarComp;
