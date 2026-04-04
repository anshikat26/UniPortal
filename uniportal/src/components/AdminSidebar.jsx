import { Link, useLocation } from "react-router-dom";
import "./AdminSidebar.css";

export default function AdminSidebar({ isOpen, closeSidebar }) {
  const location = useLocation();

  const menu = [
    { name: "📢 Notices", path: "/admin/notices" },
    { name: "📅 Events", path: "/admin/events" },
    { name: "🍽 Mess Menu", path: "/admin/mess" },
    { name: "🚌 Bus Status", path: "/admin/bus" },
    { name: "🧪 Lab Availability", path: "/admin/lab" },
    { name: "📘 Academic Calendar", path: "/admin/calendar" },
    { name: "🚨 Help", path: "/admin/help" },
  ];

  return (
    <>
      
      {isOpen && (
        <div className="overlay" onClick={closeSidebar}></div>
      )}

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        {menu.map((item, i) => (
          <Link
            key={i}
            to={item.path}
            className={location.pathname === item.path ? "active" : ""}
            onClick={() => {
              if (window.innerWidth <= 768) closeSidebar();
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </>
  );
}