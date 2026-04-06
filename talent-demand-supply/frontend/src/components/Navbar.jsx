import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 40px",
      height: "70px",
      background: "#0b3d91",
      color: "white",
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 1000,
      boxSizing: "border-box"
    }}>
      <h2 style={{ margin: 0 }}>TDS Admin</h2>
      
      <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/employees" style={linkStyle}>Employees</Link>
        <Link to="/analysis" style={linkStyle}>Analysis</Link>
        
        {/* THIS WAS MISSING - The link to your new page */}
        <Link to="/add-talent" style={{...linkStyle, background: "#2563eb", padding: "8px 15px", borderRadius: "5px"}}>
          + Add Talent
        </Link>
       
        <Link to="/login" style={{...linkStyle, background: "#16a34a", padding: "8px 15px", borderRadius: "5px"}}>
          Login
        </Link>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "14px"
};

export default Navbar;