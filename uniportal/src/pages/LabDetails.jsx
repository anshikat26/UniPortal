import { useParams, useNavigate } from "react-router-dom";

const labsData = [
  { id:1, name:"Computer Lab 1", type:"computer", status:"available" },
  { id:2, name:"Computer Lab 2", type:"computer", status:"occupied", time:"12:00 PM" },
  { id:3, name:"Chemistry Lab", type:"chemistry", status:"available" },
  { id:4, name:"Mechanical Lab", type:"mechanical", status:"occupied", time:"1:30 PM" }
];

function LabDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const lab = labsData.find(l => l.id === Number(id));

  if (!lab) {
    return <h2 style={{color:"white", padding:"40px"}}>Lab Not Found</h2>;
  }

  return (
    <div className="details-page">

      {/* HEADER */}
      <div className="details-header">
        <button onClick={()=>navigate("/lab")} className="back-btn">
          ← Back
        </button>

        <h1>{lab.name}</h1>
      </div>

      {/* CARD */}
      <div className="details-card">

        <div className="details-row">
          <span>Type</span>
          <p>{lab.type}</p>
        </div>

        <div className="details-row">
          <span>Status</span>
          <p className={lab.status === "available" ? "green" : "red"}>
            {lab.status === "available"
              ? "Available ✔"
              : `Occupied until ${lab.time}`}
          </p>
        </div>

        <div className="details-row">
          <span>Seats</span>
          <p>40</p>
        </div>

        <div className="details-row">
          <span>Location</span>
          <p>Block B</p>
        </div>

        <div className="details-row">
          <span>Timings</span>
          <p>9 AM - 5 PM</p>
        </div>

      </div>

    </div>
  );
}

export default LabDetails;