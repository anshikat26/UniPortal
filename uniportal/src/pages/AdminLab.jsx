import { useState } from "react";
import "./AdminLab.css";

export default function AdminLab() {

  const [labName, setLabName] = useState("");
  const [labType, setLabType] = useState("Computer");
  const [status, setStatus] = useState("Available");
  const [time, setTime] = useState("");

  const [labs, setLabs] = useState([]);
  const [notice, setNotice] = useState("");
  const [notices, setNotices] = useState([]);

  const addLab = () => {
    if (!labName) return;

    setLabs([...labs, { name: labName, type: labType, status, time }]);
    setLabName("");
    setTime("");
  };

  const deleteLab = (index) => {
    setLabs(labs.filter((_, i) => i !== index));
  };

  const addNotice = () => {
    if (!notice) return;
    setNotices([...notices, notice]);
    setNotice("");
  };

  const deleteNotice = (index) => {
    setNotices(notices.filter((_, i) => i !== index));
  };

  return (
    <div className="admin-lab-page">

      <div className="hero-card">
        🧪 Admin Lab Control Panel
      </div>

      <div className="admin-card">
        <h3>📅 Set Date (Student View)</h3>
        <input type="date" />
        <button className="primary-btn">Save Date</button>
      </div>

      <div className="admin-card">
        <h3>Add Lab</h3>

        <input
          type="text"
          placeholder="Lab Name"
          value={labName}
          onChange={(e) => setLabName(e.target.value)}
        />

        <select value={labType} onChange={(e) => setLabType(e.target.value)}>
          <option>Computer</option>
          <option>Physics</option>
          <option>Chemistry</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Available</option>
          <option>Occupied</option>
        </select>

        <input
          type="text"
          placeholder="Occupied till (optional)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button className="primary-btn" onClick={addLab}>
          Add Lab
        </button>
      </div>

      <div className="admin-card">
        <h3>Lab Status</h3>

        {labs.length === 0 && <p>No labs added</p>}

        {labs.map((lab, index) => (
          <div className="list-item" key={index}>
            <span className="item-text">
              <strong>{lab.name}</strong> ({lab.type}) - {lab.status}
            </span>
            <button className="delete-btn" onClick={() => deleteLab(index)}>
              ❌
            </button>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <h3>📢 Add Notice</h3>

        <input
          type="text"
          placeholder="Enter notice"
          value={notice}
          onChange={(e) => setNotice(e.target.value)}
        />

        <button className="primary-btn" onClick={addNotice}>
          Add Notice
        </button>

        {notices.map((n, i) => (
          <div className="list-item" key={i}>
            <span className="item-text">{n}</span>
            <button className="delete-btn" onClick={() => deleteNotice(i)}>
              ❌
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}