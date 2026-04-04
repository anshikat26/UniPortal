import "./Dashboard.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLink, FiCalendar, FiBell } from "react-icons/fi";

function Dashboard(){
const navigate = useNavigate();

const [menuOpen,setMenuOpen] = useState(false);
const [userName, setUserName] = useState("Student");


const [links, setLinks] = useState([]);
const [news, setNews] = useState([]);
const [dates, setDates] = useState([]);


useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if(storedUser){
    setUserName(storedUser.name);
  }
}, []);

useEffect(() => {

  const fetchData = () => {

    fetch("http://localhost:5000/api/dashboard/links")
      .then(res => res.json())
      .then(data => setLinks(data))
      .catch(err => console.log(err));

    fetch("http://localhost:5000/api/dashboard/news")
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(err => console.log(err));

    fetch("http://localhost:5000/api/dashboard/dates")
      .then(res => res.json())
      .then(data => setDates(data))
      .catch(err => console.log(err));

  };

  fetchData();

  const interval = setInterval(fetchData, 3000);

  return () => clearInterval(interval);

}, []);


const hour = new Date().getHours();

let greeting = "Good Morning";

if(hour >= 12 && hour < 17){
 greeting = "Good Afternoon";
}
else if(hour >= 17){
 greeting = "Good Evening";
}

return(

<div className="dashboard-container">


<div 
  className={`sidebar ${menuOpen ? "open" : ""}`}
  onClick={(e) => e.stopPropagation()}
>
<ul className="menu-list">
<li onClick={()=>navigate("/notices")}>📢 Notices</li>
<li onClick={()=>navigate("/events")}>📅 Events</li>
<li onClick={()=>navigate("/mess")}>🍽 Mess Menu</li>
<li onClick={()=>navigate("/bus")}>🚌 Bus Status</li>
<li onClick={()=>navigate("/lab")}>🧪 Lab Availability</li>
<li onClick={()=>navigate("/academic")}>📄 Academic Calendar</li>
<li onClick={()=>navigate("/emergency")}>🚨 Emergency & Help</li>
</ul>
</div>


{menuOpen && (
<div className="overlay" onClick={()=>setMenuOpen(false)}></div>
)}


<div className="top-navbar">

  <div className="nav-left">
    <button className="menu-btn" onClick={()=>setMenuOpen(!menuOpen)}>
      ☰
    </button>
  </div>

  <div className="nav-center">
    <h2 className="portal-title">UniPortal</h2>
  </div>

  <div className="nav-right">
    <span className="icon">🔔</span>

    <button
      onClick={() => {
        const current = localStorage.getItem("darkMode") === "true";
        const newMode = !current;

        localStorage.setItem("darkMode", newMode);

        if (newMode) {
          document.body.classList.add("dark");
        } else {
          document.body.classList.remove("dark");
        }
      }}
    >
      🌙
    </button>
  </div>

</div>

<div 
  className={`main-content ${menuOpen ? "sidebar-active" : ""}`}
  onClick={() => {
    if(menuOpen) setMenuOpen(false);
  }}
>


  <div className="dashboard-header-card">
    <div>
      <h2>👋 {greeting}, {userName}</h2>
      <p>Student Dashboard</p>
      <p>{new Date().toDateString()}</p>
    </div>

    <img src="https://i.pravatar.cc/100" alt="profile"/>
  </div>

 
  <div className="dashboard-grid">

   
    <div className="dashboard-card">
     <h3><FiLink /> Useful Links</h3>
      <ul className="card-list">
        {links.length > 0 ? (
          links.map((item, i) => (
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
))
        ) : (
          <li>No links available</li>
        )}
      </ul>
    </div>

  
    <div className="dashboard-card">
     <h3><FiBell /> Campus News</h3>
     <ul className="card-list">
        {news.length > 0 ? (
          news.map((item, i) => <li key={i}>{item}</li>)
        ) : (
          <li>No news available</li>
        )}
      </ul>
    </div>

    <div className="dashboard-card full-width">
     <h3><FiCalendar /> Important Dates</h3>
     <ul className="card-list">
        {dates.length > 0 ? (
          dates.map((item, i) => <li key={i}>{item}</li>)
        ) : (
          <li>No dates available</li>
        )}
      </ul>
    </div>

  </div>

</div>

</div>
);
}

export default Dashboard;