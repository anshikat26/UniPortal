import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup(){

const navigate = useNavigate();

// 🔥 STATES
const [name, setName] = useState("");
const [course, setCourse] = useState("");
const [roll, setRoll] = useState("");
const [dob, setDob] = useState("");
const [phone, setPhone] = useState("");
const [email, setEmail] = useState("");

const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [error, setError] = useState("");

// 🔥 VALIDATION
const validatePassword = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  if (!/[!@#$%^&*]/.test(password)) {
    return "Password must include a special character (!@#$%^&*)";
  }
  return "";
};

// 🔥 HANDLE SIGNUP (BACKEND CONNECTED)
const handleSignup = async () => {

  // empty check
  if(!name || !course || !roll || !dob || !phone || !email || !password){
    setError("Please fill all fields ❗");
    return;
  }

  const errorMsg = validatePassword(password);

  if (errorMsg) {
    setError(errorMsg);
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match ❗");
    return;
  }

  setError("");

  try {

    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        course,
        instituteId: roll,
        dob,
        phone,
        email,
        password
      })
    });

    const data = await response.json();

    console.log(data);

    if(response.status === 200){
      alert("Account created successfully ✅");
      navigate("/login");
    } else {
      setError(data.message);
    }

  } catch (err){
    setError("Server error ❌");
  }
};

return(

<div className="auth-page">

<div className="auth-card">

<h2 className="auth-title">
<img
  src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
  width="30"
  alt="user icon"
  style={{marginRight:"8px", verticalAlign:"middle"}}
/>
Create Account
</h2>

<label>Name *</label>
<input 
className="auth-input" 
placeholder="Enter your name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<label>Course *</label>
<input 
className="auth-input" 
placeholder="Enter course"
value={course}
onChange={(e)=>setCourse(e.target.value)}
/>

<label>Roll No *</label>
<input 
className="auth-input" 
placeholder="Enter roll number"
value={roll}
onChange={(e)=>setRoll(e.target.value)}
/>

<label>DOB *</label>
<input 
type="date"
className="auth-input"
value={dob}
onChange={(e)=>setDob(e.target.value)}
/>

<label>Phone *</label>
<input 
className="auth-input" 
placeholder="Enter phone number"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
/>

<label>Email *</label>
<input 
className="auth-input" 
placeholder="Enter email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<label>Password *</label>
<input
type="password"
className="auth-input"
placeholder="Enter password"
value={password}
onChange={(e) => {
  setPassword(e.target.value);
  setError(validatePassword(e.target.value));
}}
/>

<label>Confirm Password *</label>
<input
type="password"
className="auth-input"
placeholder="Confirm password"
value={confirmPassword}
onChange={(e) => setConfirmPassword(e.target.value)}
/>

{error && <p className="error">{error}</p>}

<button className="auth-btn" onClick={handleSignup}>
Sign Up
</button>

<hr/>
<p>
    <Link to="/login" className="auth-link">
Back to Login
</Link>
</p> 


</div>

</div>

);

}

export default Signup;