import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  experience: { type: Number, required: true },
  department: { type: String, required: true },
  location: { type: String, default: '' },
  expectedSalary: { type: Number, default: 0 },
  linkedIn: { type: String, default: '' },

  // Keep this for simple keyword searching
  skills: [String],

  // ADDED: This stores the "Intelligence" data for your Heuristic Model
  skills_detailed: [{
    name: String,
    level: { type: Number, default: 5 } // Scale of 1-10
  }]
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;