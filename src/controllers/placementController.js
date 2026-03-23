import Internship from "../models/Internship.js";

export const getPendingPlacement = async (req, res) => {
  const data = await Internship.find({
    trainerApproval: true,
    placementApproval: false,
  }).populate("studentId");

  res.json(data);
};

export const approvePlacement = async (req, res) => {
  const internship = await Internship.findById(req.params.id);
  internship.placementApproval = true;
  internship.status = "active";
  await internship.save();

  res.json({ message: "Approved by placement" });
};