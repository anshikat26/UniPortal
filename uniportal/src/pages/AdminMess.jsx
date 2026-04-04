import { useState, useEffect } from "react";
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

  const [status, setStatus] = useState({
    breakfast: "taken",
    lunch: "available",
    snacks: "not-started",
    dinner: "upcoming"
  });

  const [notice, setNotice] = useState("");
  const [notices, setNotices] = useState([]);

  // 🔥 FETCH INITIAL
  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/mess/menu")
      .then(res => res.json())
      .then(setMenuList);

    fetch("http://localhost:5000/api/dashboard/mess/status")
      .then(res => res.json())
      .then(setStatus);

    fetch("http://localhost:5000/api/dashboard/mess/notices")
      .then(res => res.json())
      .then(setNotices);
  }, []);

  // ADD MENU
  const addMenu = async (type) => {
    if (!menuInput[type]) return;

    await fetch("http://localhost:5000/api/dashboard/mess/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, value: menuInput[type] })
    });

    const updated = await fetch("http://localhost:5000/api/dashboard/mess/menu");
    setMenuList(await updated.json());

    setMenuInput({ ...menuInput, [type]: "" });
  };

  // DELETE MENU
  const deleteMenu = async (type, index) => {
    await fetch("http://localhost:5000/api/dashboard/mess/menu", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, index })
    });

    const updated = await fetch("http://localhost:5000/api/dashboard/mess/menu");
    setMenuList(await updated.json());
  };

  // UPDATE STATUS
  const updateStatus = async (newStatus) => {
    setStatus(newStatus);

    await fetch("http://localhost:5000/api/dashboard/mess/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStatus)
    });
  };

  // ADD NOTICE
  const addNotice = async () => {
    if (!notice) return;

    await fetch("http://localhost:5000/api/dashboard/mess/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: notice })
    });

    const updated = await fetch("http://localhost:5000/api/dashboard/mess/notices");
    setNotices(await updated.json());

    setNotice("");
  };

  const deleteNotice = async (i) => {
    await fetch(`http://localhost:5000/api/dashboard/mess/notices/${i}`, {
      method: "DELETE"
    });

    const updated = await fetch("http://localhost:5000/api/dashboard/mess/notices");
    setNotices(await updated.json());
  };

  return (
    <>
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <AdminSidebar isOpen={isOpen} />

      <div className="admin-mess">

        <div className="welcome-card">
          <h2>🍽 Manage Mess</h2>
          <p>Update Menu & Status</p>
        </div>

        <div className="admin-card full">
          <h3>Today's Menu</h3>

          {["breakfast","lunch","snacks","dinner"].map((meal)=>(
            <div key={meal} className="menu-block">

              <div className="menu-row">
                <input
                  placeholder={meal}
                  value={menuInput[meal]}
                  onChange={(e)=>setMenuInput({...menuInput,[meal]:e.target.value})}
                />
                <button onClick={()=>addMenu(meal)}>Add</button>
              </div>

              <div className="menu-list">
                {menuList[meal].map((item,i)=>(
                  <div key={i} className="menu-item">
                    {item}
                    <span onClick={()=>deleteMenu(meal,i)}>❌</span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        <div className="admin-card full">
          <h3>Meal Status</h3>

          {["breakfast","lunch","snacks","dinner"].map((meal)=>(
            <div key={meal} className="status-row">
              <label>{meal}</label>
              <select
                value={status[meal]}
                onChange={(e)=>updateStatus({...status,[meal]:e.target.value})}
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
            <input value={notice} onChange={(e)=>setNotice(e.target.value)} />
            <button onClick={addNotice}>Add</button>
          </div>

          <div className="menu-list">
            {notices.map((n,i)=>(
              <div key={i} className="menu-item">
                {n}
                <span onClick={()=>deleteNotice(i)}>❌</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}