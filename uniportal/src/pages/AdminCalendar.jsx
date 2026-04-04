import { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminCalendar.css";

export default function AdminCalendar() {

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(prev => !prev);

  const [calendar, setCalendar] = useState("");
  const [fullCalendar, setFullCalendar] = useState("");
  const [holiday, setHoliday] = useState("");
  const [mid, setMid] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("docs")) || [];

    saved.forEach(doc => {
      if(doc.type === "calendar") setCalendar(doc.link);
      if(doc.type === "full") setFullCalendar(doc.link);
      if(doc.type === "holiday") setHoliday(doc.link);
      if(doc.type === "mid") setMid(doc.link);
      if(doc.type === "end") setEnd(doc.link);
    });
  }, []);

  const saveAll = () => {
    const data = [
      { type: "calendar", link: calendar, name: "Academic Calendar" },
      { type: "full", link: fullCalendar, name: "Full Calendar" },
      { type: "holiday", link: holiday, name: "Holiday List" },
      { type: "mid", link: mid, name: "Mid Sem" },
      { type: "end", link: end, name: "End Sem" }
    ];

    localStorage.setItem("docs", JSON.stringify(data));
    alert("Saved successfully ✅");
  };

  const clearAll = () => {
    localStorage.removeItem("docs");

    setCalendar("");
    setFullCalendar("");
    setHoliday("");
    setMid("");
    setEnd("");

    alert("All PDFs removed ❌");
  };

  return (
    <>
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <AdminSidebar isOpen={isOpen} />

      <div className="admin-calendar-page">

        <div className="hero-card">
          <h2>📅 Upload Academic PDFs</h2>
        </div>

        <div className="admin-card">

          <label>📅 Academic Calendar PDF</label>
          <input
            placeholder="Paste Academic Calendar PDF link"
            value={calendar}
            onChange={(e)=>setCalendar(e.target.value)}
          />

          <label>📂 Full Academic Calendar PDF</label>
          <input
            placeholder="Paste Full Calendar PDF link"
            value={fullCalendar}
            onChange={(e)=>setFullCalendar(e.target.value)}
          />

          <label>🏖 Holiday List PDF</label>
          <input
            placeholder="Paste Holiday List PDF link"
            value={holiday}
            onChange={(e)=>setHoliday(e.target.value)}
          />

       
          <label>📝 Mid Sem Exam PDF</label>
          <input
            placeholder="Paste Mid Sem Exam PDF link"
            value={mid}
            onChange={(e)=>setMid(e.target.value)}
          />
          <label>📊 End Sem Exam PDF</label>
          <input
            placeholder="Paste End Sem Exam PDF link"
            value={end}
            onChange={(e)=>setEnd(e.target.value)}
          />

          <div style={{marginTop:"20px"}}>
            <button onClick={saveAll}>💾 Save All</button>

            <button 
              onClick={clearAll} 
              style={{marginLeft:"10px"}}
            >
              ❌ Delete All
            </button>
          </div>

        </div>

      </div>
    </>
  );
}