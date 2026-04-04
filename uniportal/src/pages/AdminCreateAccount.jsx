import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Admin.css";

function AdminCreateAccount() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    empId: "",
    email: "",
    gender: "",
    department: "",
    password: "",
    confirmPassword: ""
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {

    const { name, empId, email, gender, department, password, confirmPassword } = form;

    if (!name || !empId || !email || !selectedDate || !gender || !department || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      console.log("SENDING ADMIN DATA...");

      const requestBody = {
        name: name.trim(),
        course: department.trim(),
        instituteId: empId.trim(),
        dob: selectedDate.toISOString(),   
        phone: "9999999999",
        email: email.trim(),
        password: password.trim(),
        role: "admin"  
      };

      console.log("REQUEST BODY:", requestBody);

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      console.log("REGISTER RESPONSE:", data);

      if (!response.ok) {
        alert(data.message || "Error creating account ❌");
        return;
      }

      alert("Admin Account Created ✅");

      navigate("/admin-login");

    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
  };

  return (
    <div className="admin-page">

      <div className="admin-auth-card">

        <h2 className="admin-title">Create Admin Account</h2>

        <input
          name="name"
          placeholder="Full Name"
          className="admin-input"
          onChange={handleChange}
        />

        <input
          name="empId"
          placeholder="Employee ID"
          className="admin-input"
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="admin-input"
          onChange={handleChange}
        />

        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          placeholderText="Select Date of Birth"
          className="admin-input"
        />

        <select
          name="gender"
          className="admin-input"
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          name="department"
          placeholder="Department"
          className="admin-input"
          onChange={handleChange}
        />

        <div style={{ position: "relative" }}>
          <input
            name="password"
            type={showPass ? "text" : "password"}
            placeholder="Enter Password"
            className="admin-input"
            onChange={handleChange}
          />

          <span
            onClick={() => setShowPass(!showPass)}
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              cursor: "pointer"
            }}
          >
            👁
          </span>
        </div>

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="admin-input"
          onChange={handleChange}
        />

        <button className="admin-btn" onClick={handleSubmit}>
          Create Account
        </button>

        <p
          className="admin-link"
          onClick={() => navigate("/admin-login")}
        >
          ← Back to Login
        </p>

      </div>
    </div>
  );
}

export default AdminCreateAccount;