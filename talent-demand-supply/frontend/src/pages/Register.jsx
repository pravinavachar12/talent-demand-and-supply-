import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx"; // Import Context

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate", // Default role
    skills: ""
  });

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = formData;
    
    // 1. Call the register function from AuthContext
    const result = await register(name, email, password, role);
    
    if (result.success) {
      alert("✅ Registration Successful!");
      navigate("/dashboard");
    } else {
      alert(`❌ Error: ${result.message}`);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: "20px", color: "#1e293b" }}>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            required
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
            style={styles.input}
          />

          {/* Role Selection - Very important for TDS Logic */}
          <select 
            name="role" 
            onChange={handleChange} 
            style={styles.input}
            value={formData.role}
          >
            <option value="candidate">Candidate (Supply)</option>
            <option value="recruiter">Recruiter (Demand)</option>
          </select>

          {formData.role === "candidate" && (
            <input
              name="skills"
              type="text"
              placeholder="Skills (React, Node.js, etc)"
              onChange={handleChange}
              style={styles.input}
            />
          )}

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
        
        <p style={{ marginTop: "15px", fontSize: "14px", color: "#64748b" }}>
          Already have an account? <span onClick={() => navigate("/login")} style={{color: "#2563eb", cursor: "pointer"}}>Login</span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { height: "90vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f1f5f9" },
  card: { background: "white", padding: "40px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", width: "400px", textAlign: "center" },
  input: { width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc", outline: "none", boxSizing: "border-box" },
  button: { width: "100%", padding: "12px", background: "#16a34a", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" }
};

export default Register;