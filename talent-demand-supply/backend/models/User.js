import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // unique ensures no duplicate accounts
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['candidate', 'recruiter', 'admin'], 
    default: 'candidate' 
  },
  // Link this user to their Employee profile if they are a candidate
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
}, { timestamps: true });

// PASSWORD HASHING: This runs automatically before saving a user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// METHOD TO CHECK PASSWORD: Used during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;