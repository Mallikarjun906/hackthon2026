import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: String, // student report

    aiFeedback: String, // AI analysis
    rating: Number,     // AI rating

    status: {
      type: String,
      default: "submitted",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);