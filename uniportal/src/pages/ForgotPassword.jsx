import { useState } from "react"

function Forgot(){

const [email,setEmail] = useState("")
const [message,setMessage] = useState("")

const handleReset = () => {

if(email === ""){
setMessage("Please enter your email")
return
}

setMessage("Demo: Reset link would be sent to your email (frontend demo only)")
}

return(

<div className="auth-container">

<div className="auth-page"> 

<div className="auth-card">

<div style={{textAlign:"center"}}>

<img
src="https://cdn-icons-png.flaticon.com/128/6357/6357048.png"
alt="reset"
width="60"
/>

<h2>Forgot Password</h2>

</div>

<input
className="auth-input"
placeholder="Enter Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<button
className="auth-btn"
type="button"
onClick={handleReset}
>
Send Reset Link
</button>

{message && (
<p style={{color:"red", marginTop:"10px"}}>
{message}
</p>
)}

</div>

</div>

</div>

)

}

export default Forgot