import "./Bus.css";
import { useState } from "react";

function Bus(){

const [activeModal, setActiveModal] = useState(null);

return(
<>
<div className="top-strip"></div>

<div className="bus-page">

<div className="bus-header">
<h2>🚌 Bus Services</h2>
</div>

<div className="bus-top">

<div className="bus-card purple">
<p>Your Stop</p>
<h3>Block B Entrance</h3>
</div>

<div className="bus-card blue">
<p>Next Bus</p>
<h2>09:25 AM</h2>
<span className="status green">Arriving</span>
</div>

</div>

<div className="bus-toggle">
<button className="active">CITY</button>
<button>STATION</button>
</div>

<div className="bus-list">

{[
{time:"09:25", bus:"AMC Bus #7", status:"Arriving", type:"green pulse"},
{time:"10:10", bus:"AMC Bus #5", status:"On Time", type:"green"},
{time:"11:00", bus:"AMC Bus #3", status:"On Time", type:"green"},
{time:"11:45", bus:"AMC Bus #6", status:"Delayed", type:"red"},
{time:"12:30", bus:"AMC Bus #2", status:"Scheduled", type:"grey"},
].map((item,index)=>(
<div key={index} className="bus-row">

  <div className="bus-left">
    <h3 className="bus-time">{item.time}</h3>
    <p className="bus-name">{item.bus}</p>
  </div>

  <span className={`status ${item.type}`}>
    {item.status}
  </span>

</div>
))}

</div>

<div className="bus-actions">

<button onClick={()=>setActiveModal("live")}>📍 Live Tracking</button>
<button onClick={()=>setActiveModal("schedule")}>📅 Full Schedule</button>
<button onClick={()=>setActiveModal("contact")}>💬 Contact</button>
<button onClick={()=>setActiveModal("announce")}>📢 Announcements</button>

</div>

{activeModal && (
<div className="modal-overlay">
<div className="modal">

{activeModal === "live" && (
<>
<h3>📍 Live Tracking</h3>
<p>Bus is 2 km away 🚍</p>
</>
)}

{activeModal === "schedule" && (
<>
<h3>📅 Full Schedule</h3>
<p>Buses run from 9 AM to 6 PM</p>
</>
)}

{activeModal === "contact" && (
<>
<h3>💬 Contact</h3>
<p>Call: 9876543210</p>
</>
)}

{activeModal === "announce" && (
<>
<h3>📢 Announcements</h3>
<p>No delays today ✅</p>
</>
)}

<button onClick={()=>setActiveModal(null)}>Close</button>

</div>
</div>
)}

<div className="bus-notices">
<h3>Notices</h3>

<div className="notice">
📢 Buses resume after 5 PM today
</div>

<div className="notice">
⚠ Limited service due to maintenance
</div>

</div>

</div>
</>
);

}

export default Bus;