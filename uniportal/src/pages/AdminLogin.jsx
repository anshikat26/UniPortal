import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Admin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {

    
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    if (!cleanUsername || !cleanPassword) {
      setError("Please enter username and password");
      return;
    }

    try {

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          instituteId: cleanUsername,  
          password: cleanPassword
        })
      });

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      if (!response.ok) {
        setError(data.message || "Login failed ❌");
        return;
      }

      
      if (data.role !== "admin") {
        setError("Access denied ❌ Not an admin");
        return;
      }

     
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.role);

   
      navigate("/admin-dashboard");

    } catch (err) {
      console.error(err);
      setError("Server error ❌");
    }
  };

  return (
    <div className="admin-page">

      <div className="admin-auth-card">

        <div className="admin-cap">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Admin"
          />
        </div>

        <h2 className="admin-title">Admin Login</h2>

        <input
          className="admin-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="admin-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="admin-options">
          <div>
            <input type="checkbox" />
            <span> Remember me</span>
          </div>

          <span
            className="admin-link"
            onClick={() => navigate("/admin-forgot")}
          >
            Forgot Password?
          </span>
        </div>

        {error && <p className="admin-error">{error}</p>}

        <button className="admin-btn" onClick={handleLogin}>
          Login
        </button>

        <hr />

        <p
          className="admin-link"
          onClick={() => navigate("/admin-create")}
        >
          Create Account
        </p>

      </div>
    </div>
  );
}

export default AdminLogin;