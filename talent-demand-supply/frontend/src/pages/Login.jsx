import React, { useState, useContext } from "react"; // 1. Added useContext
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx"; // 2. Import your Context

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  // 3. Destructure the login function from context
  const { login } = useContext(AuthContext); 

  const handleSubmit = async (e) => { // 4. Made this async
    e.preventDefault();
    
    // 5. Call the real login function from AuthContext
    const result = await login(email, password);
    
    if (result.success) {
      // 6. Redirect to dashboard on success
      navigate("/dashboard");
    } else {
      // 7. Show actual error from backend (e.g., "User not found")
      alert(`❌ ${result.message}`);
    }
  };

  return (
    <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #0b3d91 0%, #1e293b 100%)" }}>
      <form onSubmit={handleSubmit} style={{ background: "white", padding: "40px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", width: "350px", textAlign: "center" }}>
        <h2 style={{ marginBottom: "20px", color: "#07214c" }}>HR Portal Login</h2>
        
        <input 
          type="email" 
          placeholder="Enter Email" 
          required
          value={email} // Controlled component
          onChange={(e) => setEmail(e.target.value)} 
          style={inputStyle} 
        />
        
        <input 
          type="password" 
          placeholder="Enter Password" 
          required
          value={password} // Controlled component
          onChange={(e) => setPassword(e.target.value)} 
          style={inputStyle} 
        />
        
        <button type="submit" style={btnStyle}>Login to System</button>
        
        {/* Updated help text to reflect real database usage */}
        <p style={{ fontSize: "12px", color: "#154588", marginTop: "15px" }}>
            Please use your registered credentials.
        </p>
      </form>
    </div>
  );
}

const inputStyle = { width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box", outline: "none" };
const btnStyle = { width: "100%", padding: "12px", background: "#093277", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" };

export default Login;