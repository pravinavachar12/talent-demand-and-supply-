import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import SkillAnalysis from "./pages/SkillAnalysis";
import AddEmployee from "./pages/AddEmployee"; 
import AiInsights from "./pages/AiInsights"; 

function App() {
  return (
    <BrowserRouter>
      {/* This div ensures the footer stays at the bottom */}
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        
        <Navbar />

        <div style={{ flex: 1, marginTop: "70px" }}> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/analysis" element={<SkillAnalysis />} />
            <Route path="/add-talent" element={<AddEmployee />} />
            <Route path="/ai-insights" element={<AiInsights />} />
          </Routes>
        </div>

        <Footer /> 
        
      </div>
    </BrowserRouter>
  );
}

export default App;