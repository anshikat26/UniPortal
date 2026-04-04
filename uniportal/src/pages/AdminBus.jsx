import { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminBus.css";

export default function AdminBus() {

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(prev => !prev);

  const [busName, setBusName] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("On Time");
  const [busList, setBusList] = useState([]);

  const [notice, setNotice] = useState("");
  const [notices, setNotices] = useState([]);

  const handleBus = () => {
    if (!busName || !time) return;

    setBusList([...busList, {
      id: Date.now(),
      busName,
      time,
      status
    }]);

    setBusName("");
    setTime("");
  };

  const deleteBus = (id) => {
    setBusList(busList.filter(b => b.id !== id));
  };

  const addNotice = () => {
    if (!notice) return;
    setNotices([...notices, notice]);
    setNotice("");
  };

  const deleteNotice = (i) => {
    setNotices(notices.filter((_, idx) => idx !== i));
  };

  const getColor = (status) => {
    if (status === "On Time") return "#22c55e";
    if (status === "Delayed") return "#ef4444";
    if (status === "Arriving") return "#3b82f6";
    return "#6b7280";
  };

  return (
    <>
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <AdminSidebar isOpen={isOpen} />

      <div className="admin-bus-page">

        <div className="hero-card">
          <h2>🚌 Manage Bus Status</h2>
        </div>

        <div className="admin-card">
          <input placeholder="Bus Name" value={busName} onChange={e => setBusName(e.target.value)} />
          <input type="time" value={time} onChange={e => setTime(e.target.value)} />

          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option>On Time</option>
            <option>Delayed</option>
            <option>Arriving</option>
            <option>Scheduled</option>
          </select>

          <button className="primary-btn" onClick={handleBus}>Add Bus</button>
        </div>

        <div className="admin-card">
          {busList.map(bus => (
            <div className="bus-row" key={bus.id}>
              <div>
                <span className="status" style={{ background: getColor(bus.status) }}>
                  {bus.status}
                </span>
                <h3>{bus.time}</h3>
                <p>{bus.busName}</p>
              </div>

              <button className="delete-btn" onClick={() => deleteBus(bus.id)}>❌</button>
            </div>
          ))}
        </div>

        <div className="admin-card">
          <h3>Notices</h3>

          <input
            placeholder="Enter notice"
            value={notice}
            onChange={e => setNotice(e.target.value)}
          />

          <button className="primary-btn" onClick={addNotice}>
            Add Notice
          </button>

          {notices.map((n, i) => (
            <div key={i} className="notice-row">
              {n}
              <button className="delete-btn" onClick={() => deleteNotice(i)}>❌</button>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}