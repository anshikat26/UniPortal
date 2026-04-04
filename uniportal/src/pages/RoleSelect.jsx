import { useNavigate } from "react-router-dom";
import "./RoleSelect.css";
export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="role-page">

   
      <h1 className="app-title">UniPortal</h1>

      <h2 className="role-heading">Select Your Role</h2>

      <div className="role-container">

        <div
          onClick={() => navigate("/login")}
          className="role-card"
        >
          🎓
          <h3>Student</h3>
        </div>

        <div
          onClick={() => navigate("/admin-login")}
          className="role-card"
        >
          🧑‍💻
          <h3>Admin</h3>
        </div>

      </div>

    </div>
  );
}