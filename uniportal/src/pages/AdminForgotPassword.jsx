import { useState } from "react";
import "./Admin.css";

function AdminForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (email === "") {
      alert("Please enter email");
      return;
    }

    alert("Reset link sent!");
  };

  return (
    <div className="admin-page">

      <div className="admin-auth-card">

        <div className="admin-cap">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
            alt="reset"
          />
        </div>

        <h2 className="admin-title">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="admin-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="admin-btn" onClick={handleReset}>
          Send Reset Link
        </button>

      </div>

    </div>
  );
}

export default AdminForgotPassword;