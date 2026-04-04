import { useEffect, useState } from "react";
import "./AdminNavbar.css";

export default function AdminNavbar({ toggleSidebar }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.body.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (dark) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDark(!dark);
  };

  return (
    <div className="navbar">
      <button className="menu-btn" onClick={toggleSidebar}>☰</button>

      <h2 className="nav-title">UniPortal</h2>

      <div className="nav-right">
        <button className="nav-icon">🔔</button>
        <button className="nav-icon" onClick={toggleTheme}>
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </div>
  );
}