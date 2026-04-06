import mongoose from "mongoose";

// This tells the script what an Employee looks like
const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  skills: [String],
  experience: Number
});

// We check if the model exists, otherwise we create it
const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

const dummyEmployees = [
  { name: "Rutuja", email: "rutu@test.com", department: "IT", skills: ["React", "Node.js", "MongoDB"], experience: 2 },
  { name: "Amit Sharma", email: "amit@test.com", department: "Backend", skills: ["Java", "SQL", "Spring"], experience: 4 },
  { name: "Snehal Patil", email: "snehal@test.com", department: "DevOps", skills: ["Python", "AWS", "Docker"], experience: 3 },
  { name: "Raj Malhotra", email: "raj@test.com", department: "Frontend", skills: ["React", "CSS", "Javascript"], experience: 1 },
  { name: "Priya Das", email: "priya@test.com", department: "IT", skills: ["Python", "Machine Learning"], experience: 5 }
];

async function seedDatabase() {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect("mongodb://127.0.0.1:27017/tds_project");
    console.log("Connected to MongoDB...");

    // 2. Clear existing data so we don't get duplicates
    await Employee.deleteMany({});
    console.log("Old data cleared.");

    // 3. Insert the new dummy data
    await Employee.insertMany(dummyEmployees);
    console.log("✅ Database Seeded Successfully with 5 Employees!");

    // 4. Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
}

seedDatabase();