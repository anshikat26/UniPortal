import "./AdminNotices.css";
import { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminNotices() {

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [formLink, setFormLink] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(saved);
  }, []);

  const addEvent = () => {
    if (!title || !date) return;

    const newEvent = {
      id: Date.now(),
      title,
      date,
      description,
      formLink
    };

    const oldData = JSON.parse(localStorage.getItem("events")) || [];
    const updatedData = [...oldData, newEvent];

    localStorage.setItem("events", JSON.stringify(updatedData));
    setEvents(updatedData);

    setTitle("");
    setDate("");
    setDescription("");
    setFormLink("");
  };

  const deleteEvent = (id) => {
    const oldData = JSON.parse(localStorage.getItem("events")) || [];
    const updatedData = oldData.filter(event => event.id !== id);

    localStorage.setItem("events", JSON.stringify(updatedData));
    setEvents(updatedData);
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

        <div className="admin-card">
          <h3>All Notices</h3>

          <ul>
            {events.map(event => (
              <li key={event.id}>
                <b>{event.title}</b> - {event.date} <br />
                <small>{event.description}</small> <br />

                {event.formLink && (
                  <a href={event.formLink} target="_blank" rel="noreferrer">
                    🔗 View Form
                  </a>
                )}

                <br />

                <button
                  className="delete-btn"
                  onClick={() => deleteEvent(event.id)}
                >
                  ❌ Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </>
  );
}