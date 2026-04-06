import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Mail,
  Briefcase,
  Trash2,
  MapPin,
  DollarSign,
  Linkedin,
} from "lucide-react";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const res = await axios.get(
      "https://talent-demand-and-supply.onrender.com//api/employees",
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      },
    );
    setEmployees(res.data);
  };

  const deleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to remove this talent?")) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios.delete(
        `https://talent-demand-and-supply.onrender.com//api/employees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );
      fetchEmployees();
    }
  };

  // --- THE SEARCH LOGIC ---
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h1 style={{ color: "#1e293b", margin: 0 }}>Talent Directory</h1>

          {/* SEARCH BAR */}
          <div style={styles.searchBox}>
            <Search size={18} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search by name, email or skill..."
              style={styles.searchInput}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div style={styles.grid}>
          {filteredEmployees.map((emp) => (
            <div key={emp._id} style={styles.card}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ margin: 0, color: "#1e293b" }}>{emp.name}</h3>
                <button
                  onClick={() => deleteEmployee(emp._id)}
                  style={styles.deleteBtn}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <p style={styles.info}>
                <Mail size={14} /> {emp.email}
              </p>
              <p style={styles.info}>
                <Briefcase size={14} /> {emp.department} ({emp.experience} Yrs)
              </p>
              {emp.location && (
                <p style={styles.info}>
                  <MapPin size={14} /> {emp.location}
                </p>
              )}
              {emp.expectedSalary > 0 && (
                <p style={styles.info}>
                  <DollarSign size={14} /> ₹
                  {emp.expectedSalary.toLocaleString()} / year
                </p>
              )}
              {emp.linkedIn && (
                <a
                  href={emp.linkedIn}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    ...styles.info,
                    color: "#2563eb",
                    textDecoration: "none",
                  }}
                >
                  <Linkedin size={14} /> LinkedIn Profile
                </a>
              )}
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "5px",
                }}
              >
                {emp.skills.map((skill, i) => (
                  <span key={i} style={styles.tag}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "white",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    width: "400px",
  },
  searchInput: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "14px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "25px",
  },
  card: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
    border: "1px solid #e2e8f0",
  },
  info: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#64748b",
    fontSize: "14px",
    margin: "8px 0",
  },
  tag: {
    backgroundColor: "#eff6ff",
    color: "#2563eb",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
  },
  deleteBtn: {
    background: "none",
    border: "none",
    color: "#ef4444",
    cursor: "pointer",
    padding: "5px",
  },
};

export default Employees;
