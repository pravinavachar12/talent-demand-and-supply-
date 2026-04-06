import React, { useState, useEffect } from "react";
import axios from "axios";
import { AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

function SkillAnalysis() {
  const [employees, setEmployees] = useState([]);

  // Mock Market Demand (Usually comes from an API or Admin setting)
  const marketDemand = {
    React: 5,
    "Node.js": 4,
    Python: 6,
    MongoDB: 3,
  };

  useEffect(() => {
    axios
      .get("https://talent-demand-and-supply.onrender.com//api/employees")
      .then((res) => setEmployees(res.data));
  }, []);

  const calculateSupply = (skill) => {
    return employees.filter((emp) =>
      emp.skills.some((s) => s.toLowerCase() === skill.toLowerCase()),
    ).length;
  };

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1
          style={{ fontSize: "32px", color: "#1e293b", marginBottom: "10px" }}
        >
          Talent Gap Analysis
        </h1>
        <p style={{ color: "#64748b", marginBottom: "40px" }}>
          Real-time comparison between industry demand and your internal
          workforce supply.
        </p>

        <div style={styles.cardContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Skill Name</th>
                <th style={styles.th}>Market Demand</th>
                <th style={styles.th}>Internal Supply</th>
                <th style={styles.th}>Gap Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(marketDemand).map((skill, index) => {
                const supply = calculateSupply(skill);
                const demand = marketDemand[skill];
                const gap = demand - supply;

                return (
                  <tr key={index} style={styles.tableRow}>
                    <td style={{ ...styles.td, fontWeight: "700" }}>{skill}</td>
                    <td style={styles.td}>{demand} Talents</td>
                    <td style={styles.td}>{supply} Talents</td>
                    <td style={styles.td}>
                      {gap <= 0 ? (
                        <span style={styles.statusOptimized}>
                          <CheckCircle size={14} /> Optimized
                        </span>
                      ) : (
                        <span style={styles.statusShortage}>
                          <AlertTriangle size={14} /> Shortage ({gap})
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={styles.noteBox}>
          <TrendingUp size={20} color="#2563eb" />
          <span>
            Note: Internal Supply is calculated dynamically from your MongoDB
            database.
          </span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  cardContainer: {
    backgroundColor: "white",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    overflow: "hidden",
  },
  table: { width: "100%", borderCollapse: "collapse", textAlign: "left" },
  tableHeader: { backgroundColor: "#0b3d91", color: "white" },
  th: { padding: "18px", fontSize: "14px", fontWeight: "600" },
  tableRow: { borderBottom: "1px solid #f1f5f9" },
  td: { padding: "18px", fontSize: "15px", color: "#334155" },
  statusOptimized: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  statusShortage: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  noteBox: {
    marginTop: "30px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#eff6ff",
    padding: "15px",
    borderRadius: "10px",
    color: "#1e40af",
    fontSize: "14px",
  },
};

export default SkillAnalysis;
