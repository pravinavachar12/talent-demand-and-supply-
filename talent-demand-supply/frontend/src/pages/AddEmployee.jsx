import React, { useState } from "react";
import axios from "axios";
import {
  UserPlus,
  CheckCircle,
  Star,
  MapPin,
  DollarSign,
  Linkedin,
} from "lucide-react";

function AddEmployee() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "IT",
    skills: "",
    experience: "",
    proficiency: 5,
    location: "",
    expectedSalary: "",
    linkedIn: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillArray = formData.skills.split(",").map((s) => s.trim());

      const formattedData = {
        ...formData,
        skills: skillArray,
        skills_detailed: skillArray.map((name) => ({
          name: name,
          level: parseInt(formData.proficiency),
        })),
      };

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios.post(
        "https://talent-demand-and-supply.onrender.com//api/employees",
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        department: "IT",
        skills: "",
        experience: "",
        proficiency: 5,
        location: "",
        expectedSalary: "",
        linkedIn: "",
      });
      setTimeout(() => setStatus(""), 3000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        marginTop: "40px",
      }}
    >
      <div style={formStyles.card}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <UserPlus color="#2563eb" size={28} />
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1e293b" }}>
            Add New Talent
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            type="text"
            placeholder="Full Name"
            required
            style={formStyles.input}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            style={formStyles.input}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Skills (e.g. React, Node, Python)"
            required
            style={formStyles.input}
            value={formData.skills}
            onChange={(e) =>
              setFormData({ ...formData, skills: e.target.value })
            }
          />

          {/* Proficiency Slider */}
          <div
            style={{
              backgroundColor: "#f1f5f9",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#475569",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Star size={14} /> Skill Proficiency: {formData.proficiency}/10
              </label>
              <span
                style={{
                  fontSize: "12px",
                  color: "#2563eb",
                  fontWeight: "700",
                }}
              >
                {formData.proficiency >= 8
                  ? "Expert"
                  : formData.proficiency >= 5
                    ? "Intermediate"
                    : "Beginner"}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              style={{ width: "100%", cursor: "pointer" }}
              value={formData.proficiency}
              onChange={(e) =>
                setFormData({ ...formData, proficiency: e.target.value })
              }
            />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="number"
              placeholder="Experience (Years)"
              required
              style={{ ...formStyles.input, flex: 1 }}
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
            />
            <select
              style={{ ...formStyles.input, flex: 1 }}
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
            >
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Backend">Backend</option>
            </select>
          </div>

          {/* NEW: Location */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              ...formStyles.input,
            }}
          >
            <MapPin size={16} color="#94a3b8" />
            <input
              type="text"
              placeholder="Location (e.g. Mumbai, Delhi)"
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                fontSize: "16px",
              }}
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>

          {/* NEW: Expected Salary */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              ...formStyles.input,
            }}
          >
            <DollarSign size={16} color="#94a3b8" />
            <input
              type="number"
              placeholder="Expected Salary (per year in ₹)"
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                fontSize: "16px",
              }}
              value={formData.expectedSalary}
              onChange={(e) =>
                setFormData({ ...formData, expectedSalary: e.target.value })
              }
            />
          </div>

          {/* NEW: LinkedIn */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              ...formStyles.input,
            }}
          >
            <Linkedin size={16} color="#94a3b8" />
            <input
              type="text"
              placeholder="LinkedIn Profile URL"
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                fontSize: "16px",
              }}
              value={formData.linkedIn}
              onChange={(e) =>
                setFormData({ ...formData, linkedIn: e.target.value })
              }
            />
          </div>

          <button type="submit" style={formStyles.button}>
            Register Talent
          </button>
        </form>

        {status === "success" && (
          <div style={formStyles.successMsg}>
            <CheckCircle size={18} /> Talent Added Successfully!
          </div>
        )}
        {status === "error" && (
          <div
            style={{
              ...formStyles.successMsg,
              backgroundColor: "#fef2f2",
              color: "#dc2626",
            }}
          >
            ❌ Something went wrong. Please try again.
          </div>
        )}
      </div>
    </div>
  );
}

const formStyles = {
  card: {
    maxWidth: "500px",
    margin: "0 auto",
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "14px",
    borderRadius: "10px",
    fontWeight: "700",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
  },
  successMsg: {
    marginTop: "20px",
    backgroundColor: "#ecfdf5",
    color: "#059669",
    padding: "12px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: "600",
  },
};

export default AddEmployee;
