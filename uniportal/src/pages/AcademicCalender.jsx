import { useEffect, useState } from "react";
import "./AcademicCalender.css";

function AcademicCalender(){

const [docs,setDocs] = useState([]);

useEffect(()=>{
  const saved = JSON.parse(localStorage.getItem("docs")) || [];
  setDocs(saved);
},[]);


const getLink = (type) => {
  const doc = docs.find(d => d.type === type);
  return doc ? doc.link : null;
};

const openDoc = (keyword) => {
  const link = getLink(keyword);
  if(link){
    window.open(link, "_blank");
  } else {
    alert("PDF not uploaded by admin ❗");
  }
};

return(

<div className="academic-page">

<div className="academic-header">
  <h2 className="center-title">📅 Academic Calendar</h2>
</div>


<div className="search-box">
  <input placeholder="Search academic documents..." />
</div>

<div className="section">

<h3>📂 Academic Documents</h3>

<div className="grid">

<div className="card" onClick={()=>openDoc("calendar")}>
  <span>📅 Academic Calendar 2024-25</span>
  <small>PDF • Updated</small>
</div>

<div className="card" onClick={()=>openDoc("holiday")}>
  <span>🏖 Holiday List</span>
  <small>PDF • Govt + College Holidays</small>
</div>

<div className="card" onClick={()=>openDoc("mid")}>
  <span>📝 Mid-Sem Exam Schedule</span>
  <small>March 2026</small>
</div>

<div className="card" onClick={()=>openDoc("end")}>
  <span>📊 End-Sem Exam Schedule</span>
  <small>May 2026</small>
</div>

</div>

</div>


<div className="section">

<h3>📌 Important Dates</h3>

<ul className="list">
  <li>📅 Semester Start: 10 Feb 2026</li>
  <li>📝 Mid Exams: 20 Mar - 28 Mar</li>
  <li>📚 Practical Exams: 15 Apr - 25 Apr</li>
  <li>📊 End Exams: 5 May - 20 May</li>
  <li>🏖 Summer Vacation: From 25 May</li>
</ul>

</div>

<div className="section">

<h3>⬇ Download Full Calendar</h3>

<button 
  className="download-btn"
  onClick={()=>openDoc("calendar")}
>
  Download PDF
</button>

</div>

</div>

);

}

export default AcademicCalender;