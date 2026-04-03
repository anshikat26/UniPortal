import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(){

const navigate = useNavigate();

const [roll,setRoll] = useState("");
const [password,setPassword] = useState("");
const [error,setError] = useState("");
const [rememberMe,setRememberMe] = useState(false);

useEffect(() => {
  document.body.classList.remove("dark");
}, []);

const handleLogin = async () => {

if(roll === "" || password === ""){
setError("Please fill Roll Number and Password");
return;
}

try {

const response = await fetch("http://localhost:5000/api/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    instituteId: roll,
    password: password
  })
});

const data = await response.json();

console.log(data);

// ❌ error handling
if(response.status !== 200){
  setError(data.message);
  return;
}

// ✅ SAVE LOGIN STATE
if(rememberMe){
  localStorage.setItem("isLoggedIn","true");
}else{
  sessionStorage.setItem("isLoggedIn","true");
}

// ✅ SAVE USER DATA
localStorage.setItem("user", JSON.stringify(data.user));

// ✅ ROLE BASED REDIRECT
if(data.role === "admin"){
  navigate("/admin-dashboard");
}else{
  navigate("/dashboard");
}

} catch(err){
  setError("Server error ❌");
}

};

return(

<div className="auth-container">

<div className="auth-page">

<div className="auth-card">

<div className="login-cap">
<img 
src="https://cdn-icons-png.flaticon.com/128/308/308201.png"
alt="Graduation Cap"
/> 
</div>

<h2 className="auth-title">Student Login</h2>

<input
className="auth-input"
placeholder="Roll Number"
value={roll}
onChange={(e)=>setRoll(e.target.value)}
/>

<input
type="password"
className="auth-input"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<div className="auth-options">

<div className="remember-label">
<input 
type="checkbox" 
className="remember-check"
checked={rememberMe}
onChange={(e)=>setRememberMe(e.target.checked)}
/>
<span className="remember-text">Remember me</span>
</div>

<Link to="/forgot" className="auth-link">
Forgot Password?
</Link>

</div>

{error && <p className="auth-error">{error}</p>}

<button className="auth-btn" onClick={handleLogin}>
Login
</button>

<hr/>

<p>
<Link to="/signup" className="auth-link">
Create Account
</Link>
</p>

</div>

</div>

</div> 

);
 
}

export default Login;