import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  FiHome,
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { path: "/admin", icon: <FiHome size={20} />, name: "Dashboard" },
     { path: "/admin/analytics", icon: <FiHome size={20} />, name: "Analytics" },
    {
      path: "/admin/all-products",
      icon: <FiPackage size={20} />,
      name: "Products",
    },
    {
      path: "/admin/orders",
      icon: <FiShoppingBag size={20} />,
      name: "Orders",
    },
    {
      path: "/admin/all-users",
      icon: <FiUsers size={20} />,
      name: "Customers",
    },
    {
      path: "/admin/settings",
      icon: <FiSettings size={20} />,
      name: "Settings",
    },
  ];

  return (
    <div
      className={`h-screen bg-gray-800 text-white ${
        collapsed ? "w-16" : "w-64"
      } transition-all duration-300 relative`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-700"
        >
          {collapsed ? (
            <FiChevronRight size={20} />
          ) : (
            <FiChevronLeft size={20} />
          )}
        </button>
      </div>

      <nav className="mt-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-3 mx-2 rounded transition-colors duration-200 ${
                    isActive ? "bg-blue-600" : "hover:bg-gray-700"
                  } ${collapsed ? "justify-center" : ""}`
                }
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span className="ml-3">{item.name}</span>}
                {collapsed && (
                  <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {item.name}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;