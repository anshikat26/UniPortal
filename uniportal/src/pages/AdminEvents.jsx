import { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminEvents.css";

export default function AdminEvents() {

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(prev => !prev);

  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    setEvents(JSON.parse(localStorage.getItem("events")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = () => {
    if (!title || !date) return;

    setEvents([...events, { id: Date.now(), title, date }]);
    setTitle("");
    setDate("");
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <>
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <AdminSidebar isOpen={isOpen} />

      <div className="admin-events-page">

        <div className="hero-card">
          <h2>🎉 Manage Events</h2>
          <p>Admin Control Panel</p>
        </div>

        <div className="admin-card">
          <h3>Add Event</h3>

          <input
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button onClick={addEvent}>Add Event</button>
        </div>

        <div className="admin-card">
          <h3>All Events</h3>

          {events.length === 0 ? (
            <p>No events added</p>
          ) : (
            events.map(e => (
              <div key={e.id} className="event-row">
                <div>
                  <h4>{e.title}</h4>
                  <p>{new Date(e.date).toDateString()}</p>
                </div>
                <button onClick={() => deleteEvent(e.id)}>❌</button>
              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
}