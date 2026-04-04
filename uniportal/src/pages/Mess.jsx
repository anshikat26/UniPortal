import "./Mess.css";
import { useState, useRef } from "react";

function Mess() {

  const [activeModal, setActiveModal] = useState(null);
  const [leaveMeal, setLeaveMeal] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;

    const days = Object.keys(messData);
    let index = days.indexOf(selectedDay);

    if (diff > 50 && index < days.length - 1) {
      setSelectedDay(days[index + 1]);
    }

    if (diff < -50 && index > 0) {
      setSelectedDay(days[index - 1]);
    }
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const [selectedDay, setSelectedDay] = useState(today);

  const messData = {
    Monday: {
      breakfast: "Poha, Bread Butter, Tea",
      lunch: "Rice, Dal, Paneer, Roti",
      snacks: "Samosa, Tea",
      dinner: "Roti, Mix Veg, Dal, Rice",
    },
    Tuesday: {
      breakfast: "Aloo Paratha, Curd",
      lunch: "Rajma Rice, Salad",
      snacks: "Biscuits, Tea",
      dinner: "Roti, Paneer, Dal",
    },
  };

  const menu = messData[selectedDay] || messData["Monday"];

  return (
    <>
      <div className="top-strip"></div>

      <div className="mess-page">

        <div className="mess-header">
          <h2>Mess Dashboard</h2>
          <p>Central Mess – Block A ▼</p>
        </div>

        <div className="weekly-menu">
          {Object.keys(messData).map((day)=>(
            <div
              key={day}
              className={`week-pill ${selectedDay === day ? "active" : ""}`}
              onClick={()=>setSelectedDay(day)}
            >
              {day.slice(0,3)}
            </div>
          ))}
        </div>

        <div
          className="menu-card"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >

          <div className="like-btn">❤️</div>

          <h3>Today’s Menu – {selectedDay}</h3>

          <div className="menu-item breakfast">
            🍳 Breakfast — {menu.breakfast}
          </div>

          <div className="menu-item lunch">
            🍛 Lunch — {menu.lunch}
          </div>

          <div className="menu-item snacks">
            ☕ Snacks — {menu.snacks}
          </div>

          <div className="menu-item dinner">
            🍽 Dinner — {menu.dinner}
          </div>

        </div>

        <div className="status-grid">

  <div className="status-card yellow">
    Breakfast <span>✔ Taken</span>
  </div>

  <div className="status-card green">
    Lunch <span>Available</span>
  </div>

  <div className="status-card orange">
    Snacks <span>Not Started</span>
  </div>

  <div className="status-card blue">
    Dinner <span>Upcoming</span>
  </div>

</div>
        

        <div className="balance-card">
          💳 Mess Balance  
          <h3>₹ 2,350 Remaining</h3>
        </div>

        <div className="actions">

          <button onClick={()=>setActiveModal("weekly")}>
            📅 Weekly Menu
          </button>

          <button onClick={()=>setActiveModal("notice")}>
            🔔 Mess Notice
          </button>

          <button onClick={()=>setLeaveMeal(true)}>
            ❌ Leave Meal
          </button>

          <button onClick={()=>setActiveModal("feedback")}>
            ⭐ Feedback
          </button>

          <button onClick={()=>setActiveModal("attendance")}>
            📊 Attendance
          </button>

        </div>

        {activeModal && (
          <div className="modal-overlay">
            <div className="modal">

              {activeModal === "weekly" && (
                <>
                  <h3>Weekly Menu</h3>
                  <p>Mon - Poha | Tue - Paratha | Wed - Idli</p>
                </>
              )}

              {activeModal === "notice" && (
                <>
                  <h3>Mess Notice</h3>
                  <p>🍽 Dinner timing changed to 8 PM</p>
                </>
              )}

              {activeModal === "feedback" && (
                <>
                  <h3>Feedback</h3>
                  <textarea placeholder="Write your feedback..." />
                  <br />
                  <button onClick={()=>alert("Feedback submitted ✅")}>
                    Submit
                  </button>
                </>
              )}

              {activeModal === "attendance" && (
                <>
                  <h3>Attendance</h3>
                  <p>This week: 5/7 meals taken</p>
                </>
              )}

              <br />
              <button onClick={()=>setActiveModal(null)}>Close</button>

            </div>
          </div>
        )}

      <div className="mess-notices">
  <h3>Notices</h3>

  <div className="notice">
    ✨ Special Dinner Tomorrow: Biryani Night!
  </div>

  <div className="notice">
    ⚠ Mess Cleaning on Friday, Dinner Timings Delayed.
  </div>
</div>

        {leaveMeal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Leave Meal?</h3>
              <button onClick={()=>setLeaveMeal(false)}>Cancel</button>
              <button onClick={()=>{
                alert("Meal skipped ✅");
                setLeaveMeal(false);
              }}>
                Confirm
              </button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default Mess;