import { useState, useEffect } from "react";
import "./Events.css";

function Events() {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/events")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.log(err));
  }, []);

  const filtered = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="top-strip"></div>

      <div className="events-page">

        <h2 className="events-heading">🎉 Events</h2>

        {/* SEARCH */}
        <div className="events-search">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* TRENDING */}
        <h3 className="trending-title">🔥 Trending</h3>

        {/* CARDS */}
        <div className="event-grid">
          {filtered.length > 0 ? (
            filtered.map((event, index) => (
              <div key={index} className="event-card">

                <span className="badge">SOON</span>

                <h3>{event.title}</h3>

                <p className="date">
                  {new Date(event.date).toDateString()}
                </p>

                <button className="event-btn">
                  Register
                </button>

              </div>
            ))
          ) : (
            <p>No events available</p>
          )}
        </div>

      </div>
    </>
  );
}

export default Events;