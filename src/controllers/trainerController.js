import Internship from "../models/Internship.js";

// Get pending
export const getPending = async (req, res) => {
  const data = await Internship.find({ trainerApproval: false }).populate("studentId");
  res.json(data);
};

// Approve
export const approve = async (req, res) => {
  const internship = await Internship.findById(req.params.id);
  internship.trainerApproval = true;
  await internship.save();

  res.json({ message: "Approved by trainer" });
};