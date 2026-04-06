// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv"; // 1. Added dotenv for security
// import Employee from "./models/Employee.js";
// import authRoutes from "./routes/auth.js"; // 2. We will create this file next
// import protect from "./middleware/authMiddleware.js";

// dotenv.config(); // Initialize environment variables

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // 3. Updated Database Connection to use process.env (Best practice)
// const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tds_project";

// mongoose.connect(MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected Successfully!"))
//   .catch((err) => console.log("❌ Connection Error:", err));

// // 4. AUTH ROUTES (New)
// app.use("/api/auth", authRoutes); 

// // --- EXISTING ROUTES ---

// // 2. GET Route
// app.get("/api/employees", async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     res.json(employees);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch employees" });
//   }
// });

// // 3. POST Route
// app.post("/api/employees", async (req, res) => {
//   try {
//     const newEmployee = new Employee(req.body);
//     await newEmployee.save();
//     res.status(201).json(newEmployee);
//   } catch (err) {
//     res.status(400).json({ error: "Failed to save employee" });
//   }
// });

// // 4. DELETE Route
// app.delete("/api/employees/:id", async (req, res) => {
//   try {
//     await Employee.findByIdAndDelete(req.params.id);
//     res.json({ message: "Employee deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Delete failed" });
//   }
// });

// // 5. AI RECOMMENDATION ROUTE
// app.get("/api/recommend/:skill", async (req, res) => {
//   try {
//     const querySkill = req.params.skill.toLowerCase();
//     const allEmployees = await Employee.find();

//     const matches = allEmployees.map(emp => {
//       let score = 0;
//       const hasSkill = emp.skills.some(s => s.toLowerCase() === querySkill);
//       if (hasSkill) score += 70;
//       score += Math.min(emp.experience * 3, 30);
//       return { ...emp._doc, fitmentScore: score };
//     })
//     .filter(emp => emp.fitmentScore > 0)
//     .sort((a, b) => b.fitmentScore - a.fitmentScore);

//     res.json(matches);
//   } catch (err) {
//     res.status(500).json({ error: "AI Analysis failed" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Employee from "./models/Employee.js";
import authRoutes from "./routes/auth.js";
import protect from "./middleware/authMiddleware.js"; // ✅ Protect middleware added

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'https://talent-demand-and-supply.vercel.app'],
  credentials: true
}));
app.use(express.json());

// Database connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tds_project";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.log("❌ Connection Error:", err));

// Auth routes
app.use("/api/auth", authRoutes); 


// --- PROTECTED ROUTES ---

// ✅ GET Route (only logged users)
app.get("/api/employees", protect, async (req, res) => {
  try {

    const employees = await Employee.find({
      user:req.user.id   // shows only user data
    });

    res.json(employees);

  } catch (err) {

    res.status(500).json({
      error:"Failed to fetch employees"
    });

  }
});


// ✅ POST Route (only logged users)
app.post("/api/employees", protect, async (req, res) => {

  try {

    const newEmployee = new Employee({

      ...req.body,
      user:req.user.id   // attach logged user

    });

    await newEmployee.save();

    res.status(201).json(newEmployee);

  } catch (err) {

    res.status(400).json({
      error:"Failed to save employee"
    });

  }

});


// ✅ DELETE Route (admin only)
app.delete("/api/employees/:id", protect, async (req, res) => {

  try{

    if(req.user.role !== 'admin'){

      return res.status(403).json({
        message:"Only admins can delete"
      });

    }

    await Employee.findByIdAndDelete(req.params.id);

    res.json({
      message:"Employee deleted successfully"
    });

  }
  catch(err){

    res.status(500).json({
      error:"Delete failed"
    });

  }

});


// ✅ AI Recommendation Route (protected)
app.get("/api/recommend/:skill", protect, async (req, res) => {

  try{

    const querySkill = req.params.skill.toLowerCase();

    const allEmployees = await Employee.find({
      user:req.user.id
    });

    const matches = allEmployees.map(emp => {

      let score = 0;

      const hasSkill = emp.skills.some(
        s => s.toLowerCase() === querySkill
      );

      if(hasSkill) score += 70;

      score += Math.min(emp.experience * 3,30);

      return {

        ...emp._doc,
        fitmentScore:score

      };

    })
    .filter(emp => emp.fitmentScore > 0)
    .sort((a,b)=> b.fitmentScore-a.fitmentScore);

    res.json(matches);

  }
  catch(err){

    res.status(500).json({
      error:"AI Analysis failed"
    });

  }

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`🚀 Server running on port ${PORT}`);

});