import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  week: Number,
  content: String,
  aiAnalysis: String,
  rating: Number,
  status: { type: String, default: "pending" },
});

export default mongoose.model("Report", reportSchema);