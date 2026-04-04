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

  // 🔥 FETCH EVENTS
  const fetchEvents = () => {
    fetch("http://localhost:5000/api/dashboard/events")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // 🔥 ADD EVENT
  const addEvent = async () => {
    if (!title || !date) return;

    try {
      const res = await fetch("http://localhost:5000/api/dashboard/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, date })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Event added ✅");

      setTitle("");
      setDate("");

      fetchEvents(); // reload

    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    }
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
              </div>
            ))
          )}

        </div>

      </div>
    </>
  );
}