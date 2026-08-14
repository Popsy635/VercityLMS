import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    path: "/Dashboard",
  },
  {
    label: "My Courses",
    path: "/Dashboard/courses",
  },
  {
    label: "Certifications",
    path: "/Dashboard/certifications",
  },
  {
    label: "Assignment",
    path: "/Dashboard/assignments",
  },
  {
    label: "Ask My AI",
    path: "/Dashboard/ai",
  },
];

export const DashboardSidebar = () => {
  return (
    <aside className="hidden lg:flex min-h-[calc(100vh-64px)] flex-col justify-between border-r border-gray-200 bg-white px-6 py-8">

      <div>

        <p className="mb-5 text-xs font-semibold text-gray-500">
          MAIN MENU
        </p>

        <nav className="flex flex-col gap-2">

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/Dashboard"}
              className={({ isActive }) =>
                `rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-vercity text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

        </nav>

      </div>

    </aside>
  );
};

