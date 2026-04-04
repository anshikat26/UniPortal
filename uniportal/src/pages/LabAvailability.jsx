import "./LabAvailability.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LabAvailability() {

const labsData = [
  { id:1, name:"Computer Lab 1", type:"computer", status:"available" },
  { id:2, name:"Computer Lab 2", type:"computer", status:"occupied", time:"12:00 PM" },
  { id:3, name:"Chemistry Lab", type:"chemistry", status:"available" },
  { id:4, name:"Mechanical Lab", type:"mechanical", status:"occupied", time:"1:30 PM" }
];

const [filter, setFilter] = useState("all");
const [selectedLab, setSelectedLab] = useState(null); // ✅ NEW

const navigate = useNavigate();

const filteredLabs =
  filter === "all"
    ? labsData
    : labsData.filter(lab => lab.type === filter);

return (
  <div className="lab-container">

    {/* HEADER */}
    <div className="lab-header">
      <div className="lab-title">
        <h2>🧪 Lab Availability</h2>
        <p>CaEloPn ▼</p>
      </div>
    </div>

    <div className="lab-date">
      📅 April 25, 2024
    </div>

    <div className="lab-tabs">

<button
  className={filter === "all" ? "active" : ""}
  onClick={()=>setFilter("all")}
>
  🧪 All Labs
</button>

<button
  className={filter === "computer" ? "active" : ""}
  onClick={()=>setFilter("computer")}
>
  💻 Computer
</button>

<button
  className={filter === "chemistry" ? "active" : ""}
  onClick={()=>setFilter("chemistry")}
>
  🧪 Chemistry
</button>

<button
  className={filter === "mechanical" ? "active" : ""}
  onClick={()=>setFilter("mechanical")}
>
  ⚙ Mechanical
</button>

</div>

    {filteredLabs.map((lab)=>(
  <div 
    key={lab.id} 
    className={`lab-card ${lab.status === "available" ? "green" : "red"}`}
  >

    <div className="lab-top">
      {lab.name}
    </div>

    <div className="lab-bottom">

      {lab.status === "available" ? (
        <span className="available">Available ✔</span>
      ) : (
        <span className="occupied">
          Occupied until {lab.time} ❗
        </span>
      )}

      <button onClick={()=>setSelectedLab(lab)}>
        See Details
      </button>

    </div>

  </div>
))}

    {selectedLab && (
      <div className="modal-overlay" onClick={()=>setSelectedLab(null)}>

        <div className="modal-box" onClick={(e)=>e.stopPropagation()}>

          <h2>{selectedLab.name}</h2>

          <p>
            Status: {selectedLab.status === "available" 
              ? "Available ✔" 
              : `Occupied until ${selectedLab.time}`}
          </p>

          <button onClick={()=>setSelectedLab(null)}>
            Close
          </button>

        </div>

      </div>
    )}
    <div className="notice">
      <h3>• Notices</h3>

      <div className="notice-box">
        🧪 Robotics Lab closed for maintenance on April 26th.
      </div>

      <div className="notice-box">
        ⚙️ New Equipment Added to Chemistry Labs
      </div>
    </div>

  </div>
);
}

export default LabAvailability;