import Report from "../models/Report.js";

// 📊 Student Growth Data
export const getStudentGrowth = async (req, res) => {
  try {
    const studentId = req.user._id;

    const reports = await Report.find({ studentId }).sort({ createdAt: 1 });

    const data = reports.map((r, index) => ({
      week: index + 1,
      rating: r.rating || 0,
      date: r.createdAt,
    }));

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};