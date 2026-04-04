import { useState, useEffect } from "react";

function Events(){

const [filter,setFilter] = useState("all");
const [search,setSearch] = useState("");
const [liked,setLiked] = useState([]);

// 🔥 ADMIN DATA LOAD
const [events,setEvents] = useState([]);

useEffect(()=>{
  const saved = JSON.parse(localStorage.getItem("events")) || [];

  // 🔥 type auto set (important for filter)
  const today = new Date();

  const updated = saved.map(event => {
    const eventDate = new Date(event.date);
    return {
      ...event,
      type: eventDate >= today ? "upcoming" : "past",
      status: eventDate >= today ? "SOON" : "PAST"
    };
  });

  setEvents(updated);
},[]);

// ❤️ LIKE
const toggleLike = (index)=>{
  if(liked.includes(index)){
    setLiked(liked.filter(i=>i!==index));
  } else {
    setLiked([...liked,index]);
  }
};

// 🔍 FILTER
const filteredEvents = events.filter(event => {
  const matchFilter = filter === "all" || event.type === filter;
  const matchSearch = event.title.toLowerCase().includes(search.toLowerCase());
  return matchFilter && matchSearch;
});

return(

<div className="events-page">

<h2 className="events-heading">🎉 Events</h2>

{/* SEARCH */}
<div className="events-search">
<input
type="text"
placeholder="Search events..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>
</div>

{/* TRENDING */}
<div className="trending">
<h3>🔥 Trending</h3>
<div className="trending-row">
{events.slice(0,2).map((e,i)=>(
<div key={i} className="trend-card">{e.title}</div>
))}
</div>
</div>

{/* FILTER */}
<div className="events-filter">
<button onClick={()=>setFilter("all")}>All</button>
<button className="chip green" onClick={()=>setFilter("upcoming")}>Upcoming</button>
<button className="chip grey" onClick={()=>setFilter("past")}>Past</button>
</div>

{/* EVENTS */}
<div className="events-grid">

{filteredEvents.map((event,index)=>(
<div key={index} className={`event-card ${event.type}`}>

{/* LIKE */}
<span className="like-btn" onClick={()=>toggleLike(index)}>
{liked.includes(index) ? "❤️" : "🤍"}
</span>

{/* STATUS */}
<span className={`status ${event.status.toLowerCase()}`}>
{event.status}
</span>

<h3>{event.title}</h3>
<p>{new Date(event.date).toDateString()}</p>

{/* 🔥 MAIN FIX (REGISTER WORKING) */}
{event.formLink ? (
  <a href={event.formLink} target="_blank" rel="noreferrer">
    <button className="view-btn">Register</button>
  </a>
) : (
  <button className="view-btn" disabled>No Link</button>
)}

</div>
))}

</div>

</div>

);

}

export default Events;