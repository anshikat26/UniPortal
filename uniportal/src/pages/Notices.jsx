import { useState, useEffect } from "react";
import "./Notices.css";

function Notices(){

const [search,setSearch] = useState("");
const [notices,setNotices] = useState([]);
useEffect(()=>{
  const saved = JSON.parse(localStorage.getItem("events"));

  if(saved && saved.length > 0){
    const updated = saved.map(item => ({
      ...item,
      tag:
        item.title.toLowerCase().includes("exam") ? "important" :
        item.title.toLowerCase().includes("event") ? "hot" :
        "normal"
    }));
    setNotices(updated);
  } else {
   
    setNotices([
      {
        title: "Semester Exam Starting",
        date: "2026-04-10",
        description: "Exams will start from 10 April. Prepare well.",
        tag: "important",
        formLink: "#"
      },
      {
        title: "Hackathon Registration Open",
        date: "2026-03-30",
        description: "Register now and win exciting prizes.",
        tag: "hot",
        formLink: "#"
      },
      {
        title: "Workshop on AI",
        date: "2026-03-25",
        description: "Ongoing AI workshop for students.",
        tag: "normal"
      }
    ]);
  }
}, []);

// SEARCH
const filtered = notices.filter(n =>
  n.title.toLowerCase().includes(search.toLowerCase())
);

return(

<>
<div className="top-strip"></div>

<div className="notice-page">

<h2 className="notice-heading">📢 Notices</h2>

{/* SEARCH */}
<div className="notice-search">
<input
type="text"
placeholder="Search notices..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>
</div>

{/*  TRENDING SECTION */}
<div className="trending">
<h3>🔥 Trending</h3>

</div>

{/* LIST */}
<div className="notice-list">

{filtered.map((notice,index)=>(

<div key={index} className="notice-card">

<div className="notice-header">
<h3>{notice.title}</h3>

{/* TAGS */}
{notice.tag === "hot" && <span className="tag hot">🔥 HOT</span>}
{notice.tag === "important" && <span className="tag important">⭐ Important</span>}
</div>

<p className="date">
📅 {new Date(notice.date).toDateString()}
</p>

<p className="desc">
{notice.description || "No description available"}
</p>

{/* BUTTON */}
{notice.formLink && (
<a href={notice.formLink} className="btn">
Fill Form →
</a>
)}

</div>

))}

</div>

</div>
</>

);

}

export default Notices;