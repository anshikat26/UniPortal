import "./AdminDashboard.css";
import { useState, useEffect } from "react";

export default function AdminDashboard() {

  const hour = new Date().getHours();
  let greeting = "Good Evening";
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  const [links, setLinks] = useState([]);
  const [news, setNews] = useState([]);
  const [dates, setDates] = useState([]);

  const [linkInput, setLinkInput] = useState("");
  const [newsInput, setNewsInput] = useState("");
  const [dateInput, setDateInput] = useState("");

  // 🔥 FETCH DATA
  const fetchData = async () => {
    try {
      const l = await fetch("http://localhost:5000/api/dashboard/links");
      const lData = await l.json();
      console.log("FETCH LINKS:", lData);
      setLinks(lData);

      const n = await fetch("http://localhost:5000/api/dashboard/news");
      const nData = await n.json();
      console.log("FETCH NEWS:", nData);
      setNews(nData);

      const d = await fetch("http://localhost:5000/api/dashboard/dates");
      const dData = await d.json();
      console.log("FETCH DATES:", dData);
      setDates(dData);

    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const addItem = async (type, value) => {
    if (!value.trim()) return;

    console.log("SENDING:", value); 

    try {
      const response = await fetch(`http://localhost:5000/api/dashboard/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ value })
      });

      const data = await response.json();

      console.log("RESPONSE:", data);

      if (!response.ok) {
        alert("Error saving ❌");
        return;
      }

      
      if (type === "links") setLinkInput("");
      if (type === "news") setNewsInput("");
      if (type === "dates") setDateInput("");

      fetchData();

    } catch (err) {
      console.log("ERROR:", err);
      alert("Server error ❌");
    }
  };

  return (
    <div className="admin-dashboard">

      <div className="welcome-card">
        <div>
          <h2>👋 {greeting}, Admin</h2>
          <p>Admin Dashboard</p>
          <p>{new Date().toDateString()}</p>
        </div>
      </div>

      <div className="cards-grid">

       
        <div className="card">
          <h3>🔗 Useful Links</h3>

          <ul>
  {links.length > 0 ? links.map((item, i) => (
    <li key={i}>
      <a
        href={item.startsWith("http") ? item : `https://${item}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#4facfe", textDecoration: "none" }}
      >
        🔗 {item}
      </a>
    </li>
  )) : <li>No data</li>}
</ul>

          <div className="input-row">
            <input
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              placeholder="Add link"
            />
            <button onClick={() => addItem("links", linkInput)}>Add</button>
          </div>
        </div>

        
        <div className="card">
          <h3>📢 Campus News</h3>

          <ul>
            {news.length > 0 ? news.map((item, i) => (
              <li key={i}>{item}</li>
            )) : <li>No data</li>}
          </ul>

          <div className="input-row">
            <input
              value={newsInput}
              onChange={(e) => setNewsInput(e.target.value)}
              placeholder="Add news"
            />
            <button onClick={() => addItem("news", newsInput)}>Add</button>
          </div>
        </div>

       
        <div className="card full">
          <h3>📅 Important Dates</h3>

          <ul>
            {dates.length > 0 ? dates.map((item, i) => (
              <li key={i}>{item}</li>
            )) : <li>No data</li>}
          </ul>

          <div className="input-row">
            <input
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              placeholder="Add date"
            />
            <button onClick={() => addItem("dates", dateInput)}>Add</button>
          </div>
        </div>

      </div>
    </div>
  );
}