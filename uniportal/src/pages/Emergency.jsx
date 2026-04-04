import "./Emergency.css";

function Emergency(){


const handleSOS = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos)=>{
      alert(`🚨 SOS Sent!\nLocation: ${pos.coords.latitude}, ${pos.coords.longitude}`);
    });
  } else {
    alert("Location not supported");
  }
};

const callNumber = (num) => {
  window.location.href = `tel:${num}`;
};

return(

<div className="emergency-page">

<h2 className="em-title">🚨 Emergency & Help</h2>

<div className="sos-box">
  <div className="sos-btn pulse" onClick={handleSOS}>
    SOS
  </div>
  <p>Tap SOS to share your location instantly</p>
</div>

<h3>Important Contacts</h3>

<div className="contact-grid">

<div className="contact-card" onClick={()=>callNumber("0123456789")}>
🏢 College Office <br/>📞 Tap to Call
</div>

<div className="contact-card" onClick={()=>callNumber("0123456780")}>
🛡 Security <br/>📞 Tap to Call
</div>

<div className="contact-card" onClick={()=>callNumber("0123456781")}>
🏠 Hostel <br/>📞 Tap to Call
</div>

<div className="contact-card" onClick={()=>callNumber("0123456782")}>
🍽 Mess <br/>📞 Tap to Call
</div>

<div className="contact-card" onClick={()=>callNumber("0123456783")}>
🏥 Medical <br/>📞 Tap to Call
</div>

</div>

<div className="section">
<h3>Anti-Ragging Help</h3>

<p>Facing ragging? Report immediately!</p>

<button className="report-btn pulse">
🚨 Report Now
</button>
</div>

<div className="section">
<h3>Emergency Services</h3>

<div className="service" onClick={()=>callNumber("108")}>🚑 Ambulance - 108</div>
<div className="service" onClick={()=>callNumber("100")}>👮 Police - 100</div>
<div className="service" onClick={()=>callNumber("101")}>🚒 Fire - 101</div>

</div>

</div>

);

}

export default Emergency;