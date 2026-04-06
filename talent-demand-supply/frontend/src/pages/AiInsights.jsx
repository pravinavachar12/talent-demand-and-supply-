import React, { useState } from "react";
import axios from "axios";
import { Brain, Search, Award } from "lucide-react";

// --- 🧠 THE WEIGHTED HEURISTIC ALGORITHM ---
// This function calculates the "Intelligence" score
const calculateHeuristicScore = (employee, targetSkill) => {
  // Check if skill exists (since your DB has strings in the array)
  const hasSkill = employee.skills.some((s) =>
    s.toLowerCase().includes(targetSkill.toLowerCase()),
  );

  if (!hasSkill) return 0;

  // LOGIC: Expertise > Seniority
  // We assume a base proficiency of 8.5/10 for any skill match
  // to ensure technical depth is prioritized.
  const P = 8.5;
  const E = employee.experience;

  // Formula: (Skill Weight 80%) + (Logarithmic Experience Weight 20%)
  const skillWeight = P * 8;
  const experienceWeight = Math.log10(E + 1) * 20;

  const totalScore = skillWeight + experienceWeight;
  return Math.min(Math.round(totalScore), 100);
};

function AiInsights() {
  const [skill, setSkill] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // UPDATED: Now fetches all talent and applies the AI logic locally
  const getRecommendations = async () => {
    if (!skill) return;
    setLoading(true);
    try {
      // Fetching your standard employee list
      const res = await axios.get(
        `https://talent-demand-and-supply.onrender.com//api/employees`,
      );

      // APPLYING THE HEURISTIC MODEL
      const analyzedData = res.data
        .filter((emp) =>
          emp.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase())),
        )
        .map((emp) => ({
          ...emp,
          fitmentScore: calculateHeuristicScore(emp, skill), // Run the math
        }))
        .sort((a, b) => b.fitmentScore - a.fitmentScore); // Rank by highest fitment

      setResults(analyzedData);
    } catch (err) {
      console.error("AI Analysis Error:", err);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Title Section */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Brain size={48} color="#2563eb" style={{ marginBottom: "15px" }} />
          <h1 style={{ fontSize: "32px", fontWeight: "800", color: "#1e293b" }}>
            AI Talent Matcher
          </h1>
          <p style={{ color: "#64748b" }}>
            Solving the Experience vs. Expertise gap using Heuristic Scoring.
          </p>
        </div>

        {/* Search Bar */}
        <div style={styles.searchContainer}>
          <Search color="#94a3b8" size={20} />
          <input
            type="text"
            placeholder="Search a required skill (e.g. React, Python)..."
            style={styles.input}
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />
          <button onClick={getRecommendations} style={styles.button}>
            {loading ? "Analyzing..." : "Find Best Match"}
          </button>
        </div>

        {/* Results List */}
        <div style={{ display: "grid", gap: "20px" }}>
          {results.map((emp, i) => (
            <div key={i} style={styles.resultCard}>
              <div style={{ flex: 1 }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <h3 style={{ margin: 0, fontSize: "18px", color: "#1e293b" }}>
                    {emp.name}
                  </h3>
                  {i === 0 && (
                    <span style={styles.badge}>
                      <Award size={12} /> Top Match
                    </span>
                  )}
                </div>
                <p
                  style={{
                    margin: "5px 0",
                    color: "#64748b",
                    fontSize: "14px",
                  }}
                >
                  <strong>Dept:</strong> {emp.department} •{" "}
                  <strong>Exp:</strong> {emp.experience} Years
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "5px",
                    marginTop: "10px",
                  }}
                >
                  {emp.skills.map((s, idx) => (
                    <span key={idx} style={styles.skillTag}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress Bar and Score */}
              <div style={{ textAlign: "right", minWidth: "180px" }}>
                <div
                  style={{
                    color: emp.fitmentScore > 75 ? "#10b981" : "#2563eb",
                    fontWeight: "800",
                    fontSize: "28px",
                  }}
                >
                  {emp.fitmentScore}%
                </div>
                <div style={styles.progressContainer}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${emp.fitmentScore}%`,
                      backgroundColor:
                        emp.fitmentScore > 75 ? "#10b981" : "#3b82f6",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#94a3b8",
                    fontWeight: "700",
                    textTransform: "uppercase",
                  }}
                >
                  Fitment Probability
                </div>
              </div>
            </div>
          ))}

          {results.length === 0 && skill && !loading && (
            <div
              style={{
                textAlign: "center",
                color: "#94a3b8",
                marginTop: "20px",
              }}
            >
              No matches found for "{skill}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  searchContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "white",
    padding: "10px 20px",
    borderRadius: "15px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
    marginBottom: "40px",
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "16px",
    padding: "10px",
  },
  button: {
    backgroundColor: "#0b3d91",
    color: "white",
    padding: "12px 25px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  resultCard: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #e2e8f0",
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
  },
  badge: {
    backgroundColor: "#fef3c7",
    color: "#d97706",
    padding: "2px 8px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: "800",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  skillTag: {
    backgroundColor: "#f1f5f9",
    color: "#475569",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "12px",
  },
  progressContainer: {
    width: "100%",
    height: "8px",
    backgroundColor: "#f1f5f9",
    borderRadius: "10px",
    margin: "8px 0",
  },
  progressFill: {
    height: "100%",
    borderRadius: "10px",
    transition: "width 0.5s ease-in-out",
  },
};

export default AiInsights;
