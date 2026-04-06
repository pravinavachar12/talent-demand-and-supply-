import React from "react";
import { Link } from "react-router-dom";
import { BarChart2, Users, Target, ShieldCheck } from "lucide-react";

function Home() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1e293b" }}>
      {/* Hero Section */}
      <header style={styles.hero}>
        <div style={styles.heroContent}>

          <h1 style={styles.heroTitle}>Talent Demand Supply <br/><span style={{color: '#60a5fa'}}>Intelligence System</span></h1>
          <p style={styles.heroSubtitle}>
            Optimize your workforce with real-time analytics. Bridge the gap between 
            internal talent supply and global industry demand using MERN stack & AI.
          </p>
          <div style={styles.btnGroup}>
            <Link to="/login"><button style={styles.btnPrimary}>Get Started</button></Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Core Modules</h2>
        <div style={styles.featureGrid}>
          <FeatureCard 
            icon={<BarChart2 size={30} color="#60a5fa" />} 
            title="Skill Gap Analysis" 
            desc="Automatically calculate vacancies by comparing supply vs demand." 
          />
          <FeatureCard 
            icon={<Users size={30} color="#60a5fa" />} 
            title="Talent Directory" 
            desc="Comprehensive database management for your organizational staff." 
          />
          <FeatureCard 
            icon={<Target size={30} color="#60a5fa" />} 
            title="Predictive Insights" 
            desc="AI-driven recommendations for future hiring and upskilling." 
          />
          <FeatureCard 
            icon={<ShieldCheck size={30} color="#60a5fa" />} 
            title="Secure Access" 
            desc="Role-based authentication for HR Managers and Administrators." 
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div style={styles.featureCard}>
      <div style={styles.iconBox}>{icon}</div>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardDesc}>{desc}</p>
    </div>
  );
}

const styles = {
  hero: {
    height: "85vh",
    background: "linear-gradient(135deg, #0b3d91 0%, #1e293b 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "white",
    padding: "0 20px"
  },
  heroContent: { maxWidth: "800px" },
  badge: { background: "rgba(255,255,255,0.1)", display: "inline-block", padding: "5px 15px", borderRadius: "20px", fontSize: "12px", marginBottom: "20px", border: "1px solid rgba(255,255,255,0.2)" },
  heroTitle: { fontSize: "56px", fontWeight: "800", margin: "0 0 20px 0", lineHeight: "1.1" },
  heroSubtitle: { fontSize: "19px", color: "#cbd5e1", lineHeight: "1.6", marginBottom: "40px" },
  btnGroup: { display: "flex", gap: "20px", justifyContent: "center" },
  btnPrimary: { padding: "15px 45px", fontSize: "16px", background: "#2563eb", color: "white", border: "none", borderRadius: "10px", fontWeight: "700", cursor: "pointer", transition: "all 0.3s", boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.4)" },
  
  featuresSection: { padding: "80px 40px", backgroundColor: "#ffffff" },
  sectionTitle: { textAlign: "center", fontSize: "32px", fontWeight: "700", marginBottom: "50px", color: "#0f172a" },
  featureGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px", maxWidth: "1200px", margin: "0 auto" },
  
  // --- UPDATED DARK CARDS ---
  featureCard: { 
    padding: "30px", 
    backgroundColor: "#083b8d", // Dark Slate/Blue background
    borderRadius: "20px", 
    textAlign: "left",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease"
  },
  cardTitle: { 
    fontSize: '20px', 
    marginBottom: '10px', 
    color: '#ffffff', // White text
    fontWeight: '700'
  },
  cardDesc: { 
    color: '#94a3b8', // Light grey/blue text for readability
    fontSize: '14px', 
    lineHeight: '1.6' 
  },
  iconBox: { 
    marginBottom: "20px", 
    backgroundColor: "rgba(134, 150, 231, 0.05)", // Semi-transparent white box
    width: "60px", 
    height: "60px", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    borderRadius: "15px" 
  }
};

export default Home;