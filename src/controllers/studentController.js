import Internship from "../models/Internship.js";

// Apply internship
export const applyInternship = async (req, res) => {
  const internship = await Internship.create({
    studentId: req.user._id,
    domain: req.body.domain,
  });

  res.json(internship);
};