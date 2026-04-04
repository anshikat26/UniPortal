import { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminMess.css";

export default function AdminMess() {

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const [menuInput, setMenuInput] = useState({
    breakfast: "",
    lunch: "",
    snacks: "",
    dinner: ""
  });

  const [menuList, setMenuList] = useState({
    breakfast: [],
    lunch: [],
    snacks: [],
    dinner: []
  });

  const addMenu = (type) => {
    if (!menuInput[type].trim()) return;

    setMenuList({
      ...menuList,
      [type]: [...menuList[type], menuInput[type]]
    });

    setMenuInput({ ...menuInput, [type]: "" });
  };

  const deleteMenu = (type, index) => {
    setMenuList({
      ...menuList,
      [type]: menuList[type].filter((_, i) => i !== index)
    });
  };

  const [status, setStatus] = useState({
    breakfast: "taken",
    lunch: "available",
    snacks: "not-started",
    dinner: "upcoming"
  });

  const [notice, setNotice] = useState("");
  const [notices, setNotices] = useState([]);

  const addNotice = () => {
    if (!notice.trim()) return;
    setNotices([...notices, notice]);
    setNotice("");
  };

  const deleteNotice = (i) => {
    setNotices(notices.filter((_, index) => index !== i));
  };

  return (
    <>
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <AdminSidebar isOpen={isOpen} closeSidebar={() => setIsOpen(false)} />

      <div className="admin-mess">

        <div className="welcome-card">
          <h2>🍽 Manage Mess</h2>
          <p>Update Menu & Status</p>
        </div>

        <div className="admin-card full">
          <h3>Today's Menu</h3>

          {["breakfast", "lunch", "snacks", "dinner"].map((meal) => (
            <div key={meal} className="menu-block">

              <div className="menu-row">
                <input
                  placeholder={meal}
                  value={menuInput[meal]}
                  onChange={(e) =>
                    setMenuInput({ ...menuInput, [meal]: e.target.value })
                  }
                />
                <button onClick={() => addMenu(meal)}>Add</button>
              </div>

              <div className="menu-list">
                {menuList[meal].map((item, i) => (
                  <div key={i} className="menu-item">
                    {item}
                    <span onClick={() => deleteMenu(meal, i)}>❌</span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        <div className="admin-card full">
          <h3>Meal Status</h3>

          {["breakfast", "lunch", "snacks", "dinner"].map((meal) => (
            <div key={meal} className="status-row">
              <label>{meal}</label>
              <select
                value={status[meal]}
                onChange={(e) =>
                  setStatus({ ...status, [meal]: e.target.value })
                }
              >
                <option value="taken">✔ Taken</option>
                <option value="available">🟢 Available</option>
                <option value="not-started">🟡 Not Started</option>
                <option value="upcoming">🔵 Upcoming</option>
              </select>
            </div>
          ))}
        </div>

        <div className="admin-card full">
          <h3>Mess Notices</h3>

          <div className="notice-row">
            <input
              placeholder="Add notice..."
              value={notice}
              onChange={(e) => setNotice(e.target.value)}
            />
            <button onClick={addNotice}>Add</button>
          </div>

          <div className="menu-list">
            {notices.map((n, i) => (
              <div key={i} className="menu-item">
                {n}
                <span onClick={() => deleteNotice(i)}>❌</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}