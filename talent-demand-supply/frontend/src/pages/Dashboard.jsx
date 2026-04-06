import React, { useEffect, useState, useContext } from "react"; // 1. Added useContext
import axios from "axios";
import {
  Users,
  TrendingUp,
  AlertCircle,
  Briefcase,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DemandSupplyChart from "../components/DemandSupplyChart";
import { AuthContext } from "../context/AuthContext.jsx"; // 2. Import your AuthContext

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [calcSkill, setCalcSkill] = useState("");
  const [calcDemand, setCalcDemand] = useState("");
  const [topSkill, setTopSkill] = useState("-");
  const [skillGap, setSkillGap] = useState("-");
  const [openRoles, setOpenRoles] = useState("-");

  const calculateStats = () => {
    if (!calcSkill || !calcDemand) return;

    // Count how many employees have this skill
    const supply = employees.filter((emp) =>
      emp.skills.some((s) => s.toLowerCase() === calcSkill.toLowerCase()),
    ).length;

    const demand = parseInt(calcDemand);
    const gap = demand - supply;

    // Top skill is whatever you searched
    setTopSkill(calcSkill);

    // Gap status
    if (gap <= 0) {
      setSkillGap("Optimized");
    } else if (gap <= 2) {
      setSkillGap("Medium");
    } else {
      setSkillGap("High");
    }

    // Open roles is the gap number
    setOpenRoles(gap <= 0 ? 0 : gap);
  };
  const navigate = useNavigate();

  // 3. Get the user and logout function from context
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    // 4. Redirect if user isn't logged in (Frontend Guard)
    if (!user) {
      navigate("/login");
      return;
    }

    // 5. Add Authorization Header to the request
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios
      .get(
        "https://talent-demand-and-supply.onrender.com//api/employees",
        config,
      )
      .then((res) => setEmployees(res.data))
      .catch((err) => {
        console.log("Auth Error:", err);
        if (err.response?.status === 401) {
          logout(); // Log out user if token is expired/invalid
          navigate("/login");
        }
      });
  }, [user, navigate, logout]); // Dependencies for useEffect

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>TDS Intelligence Dashboard</h1>
          <p style={styles.subtitle}>
            Welcome back, <strong>{user?.name}</strong> ({user?.role})
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={styles.exportBtn}>Export PDF Report</button>
          {/* Added a Logout button for better UX */}
          <button
            onClick={logout}
            style={{ ...styles.exportBtn, backgroundColor: "#ef4444" }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Live Calculator Input */}
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "15px",
          border: "1px solid #e2e8f0",
          marginBottom: "25px",
        }}
      >
        <h3
          style={{ margin: "0 0 15px 0", fontSize: "16px", color: "#1e293b" }}
        >
          📊 Live Skill Calculator
        </h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Skill name (e.g. React)"
            value={calcSkill}
            onChange={(e) => setCalcSkill(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              fontSize: "14px",
              flex: 1,
            }}
          />
          <input
            type="number"
            placeholder="How many do you need?"
            value={calcDemand}
            onChange={(e) => setCalcDemand(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              fontSize: "14px",
              flex: 1,
            }}
          />
          <button
            onClick={calculateStats}
            style={{
              padding: "10px 20px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            Calculate
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        <StatCard
          title="Total Talents"
          value={employees.length}
          icon={<Users size={24} />}
          color="#3b82f6"
          bgColor="#eff6ff"
        />
        <StatCard
          title="Top Skill"
          value={topSkill}
          icon={<TrendingUp size={24} />}
          color="#10b981"
          bgColor="#ecfdf5"
        />
        <StatCard
          title="Skill Gap"
          value={skillGap}
          icon={<AlertCircle size={24} />}
          color="#f59e0b"
          bgColor="#fffbeb"
        />
        <StatCard
          title="Open Roles"
          value={openRoles}
          icon={<Briefcase size={24} />}
          color="#8b5cf6"
          bgColor="#f5f3ff"
        />
      </div>

      {/* Main Content Area */}
      <div style={styles.mainLayout}>
        {/* Left Side: The Chart */}
        <div style={styles.chartContainer}>
          <div style={styles.chartHeader}>
            <h2 style={styles.sectionTitle}>
              <BarChart3 size={20} style={{ marginRight: "10px" }} /> Talent Gap
              Visualization
            </h2>
            <span style={styles.liveBadge}>LIVE DATA</span>
          </div>
          <div style={{ marginTop: "20px" }}>
            <DemandSupplyChart employees={employees} />
          </div>
        </div>

        {/* Right Side: AI Insights Panel */}
        <div style={styles.aiPanel}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "700",
              marginBottom: "15px",
            }}
          >
            AI Insights
          </h2>

          {/* ROLE-BASED UI: Only show certain insights to recruiters */}
          {user?.role === "recruiter" ? (
            <>
              <div style={styles.aiNote}>
                <span style={{ fontSize: "20px" }}>🚀</span>
                <p style={styles.aiText}>
                  <strong>React</strong> demand is up by 15%. Consider
                  upskilling current IT staff.
                </p>
              </div>
              <div style={styles.aiNote}>
                <span style={{ fontSize: "20px" }}>💡</span>
                <p style={styles.aiText}>
                  Hiring 2 <strong>Node.js</strong> developers will optimize the
                  "Critical" gap status.
                </p>
              </div>
            </>
          ) : (
            <div style={styles.aiNote}>
              <span style={{ fontSize: "20px" }}>📈</span>
              <p style={styles.aiText}>
                Keep your profile updated to increase your visibility to
                recruiters!
              </p>
            </div>
          )}

          <button style={styles.aiBtn} onClick={() => navigate("/ai-insights")}>
            Generate Predictive Report
          </button>
        </div>
      </div>
    </div>
  );
}

// ... StatCard and Styles remain the same ...
function StatCard({ title, value, icon, color, bgColor }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
        border: "1px solid #e2e8f0",
        display: "flex",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: bgColor,
          color: color,
          padding: "15px",
          borderRadius: "12px",
        }}
      >
        {icon}
      </div>
      <div>
        <p style={{ margin: 0, fontSize: "14px", color: "#64748b" }}>{title}</p>
        <h2
          style={{
            margin: 0,
            fontSize: "28px",
            fontWeight: "800",
            color: "#1e293b",
          }}
        >
          {value}
        </h2>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "35px",
  },
  title: { fontSize: "28px", fontWeight: "800", color: "#1e293b", margin: 0 },
  subtitle: { color: "#64748b", margin: "5px 0 0 0" },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  mainLayout: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: "25px" },
  chartContainer: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "15px",
    border: "1px solid #e2e8f0",
  },
  chartHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    margin: 0,
    display: "flex",
    alignItems: "center",
  },
  liveBadge: {
    backgroundColor: "#dcfce7",
    color: "#16a34a",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "800",
  },
  aiPanel: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "15px",
    border: "1px solid #e2e8f0",
  },
  aiNote: {
    display: "flex",
    gap: "10px",
    backgroundColor: "#f8fafc",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  aiText: { margin: 0, fontSize: "14px", color: "#475569", lineHeight: "1.5" },
  aiBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#0b3d91",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    marginTop: "10px",
  },
  exportBtn: {
    padding: "10px 20px",
    backgroundColor: "#1e293b",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Dashboard;
