import "./Mess.css";
import { useState, useEffect } from "react";

function Mess() {

  const [menu, setMenu] = useState({});
  const [status, setStatus] = useState({});
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/mess/menu")
      .then(res => res.json())
      .then(data => {
        setMenu({
          breakfast: data.breakfast?.join(", "),
          lunch: data.lunch?.join(", "),
          snacks: data.snacks?.join(", "),
          dinner: data.dinner?.join(", ")
        });
      });

    fetch("http://localhost:5000/api/dashboard/mess/status")
      .then(res => res.json())
      .then(setStatus);

    fetch("http://localhost:5000/api/dashboard/mess/notices")
      .then(res => res.json())
      .then(setNotices);
  }, []);

  return (
    <>
      <div className="top-strip"></div>

      <div className="mess-page">

        <div className="mess-header">
          <h2>Mess Dashboard</h2>
          <p>Central Mess – Block A ▼</p>
        </div>

        <div className="menu-card">
          <h3>Today’s Menu</h3>

          <div className="menu-item breakfast">🍳 {menu.breakfast}</div>
          <div className="menu-item lunch">🍛 {menu.lunch}</div>
          <div className="menu-item snacks">☕ {menu.snacks}</div>
          <div className="menu-item dinner">🍽 {menu.dinner}</div>
        </div>

        <div className="status-grid">
          <div className="status-card yellow">Breakfast <span>{status.breakfast}</span></div>
          <div className="status-card green">Lunch <span>{status.lunch}</span></div>
          <div className="status-card orange">Snacks <span>{status.snacks}</span></div>
          <div className="status-card blue">Dinner <span>{status.dinner}</span></div>
        </div>

        <div className="mess-notices">
          <h3>Notices</h3>

          {notices.map((n,i)=>(
            <div key={i} className="notice">{n}</div>
          ))}
        </div>

      </div>
    </>
  );
}

export default Mess;