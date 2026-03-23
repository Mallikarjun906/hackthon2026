import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  domain: String,
  trainerApproval: { type: Boolean, default: false },
  placementApproval: { type: Boolean, default: false },
  status: { type: String, default: "pending" },
});

export default mongoose.model("Internship", internshipSchema);