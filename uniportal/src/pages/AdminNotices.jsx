import "./AdminNotices.css";
import { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminNotices() {

  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [formLink, setFormLink] = useState("");

  const toggleSidebar = () => setIsOpen(!isOpen);

  // 🔥 ADD NOTICE (API)
  const addEvent = async () => {

    if (!title || !date || !description) {
      alert("Fill all required fields ❌");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/dashboard/notices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          date,
          description,
          formLink
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Notice added ✅");

      // reset
      setTitle("");
      setDate("");
      setDescription("");
      setFormLink("");

    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    }
  };

  return (
    <>
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <AdminSidebar isOpen={isOpen} />

      <div className="admin-notice-page">

        <div className="welcome-card">
          <h2>🎉 Manage Notices</h2>
          <p>Add / Remove Notices</p>
        </div>

        <div className="admin-card">
          <h3>Add Notice</h3>

          <input
            type="text"
            placeholder="Notice Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Form Link (optional)"
            value={formLink}
            onChange={(e) => setFormLink(e.target.value)}
          />

          <button onClick={addEvent}>Add Notice</button>
        </div>

      </div>
    </>
  );
}