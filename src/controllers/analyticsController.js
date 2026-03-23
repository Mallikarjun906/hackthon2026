import Report from "../models/Report.js";
import User from "../models/User.js";

// 📊 Student Growth (self)
export const getStudentGrowth = async (req, res) => {
  try {
    const reports = await Report.find({ studentId: req.user._id }).sort({ createdAt: 1 });

    const data = reports.map((r, i) => ({
      week: i + 1,
      rating: r.rating || 0,
    }));

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📊 Trainer → All Students Growth
export const getAllStudentsGrowth = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });

    const result = [];

    for (let student of students) {
      const reports = await Report.find({ studentId: student._id }).sort({ createdAt: 1 });

      const growth = reports.map((r, i) => ({
        week: i + 1,
        rating: r.rating || 0,
      }));

      result.push({
        studentName: student.name,
        studentId: student._id,
        growth,
      });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🏆 Placement → Leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });

    const leaderboard = [];

    for (let student of students) {
      const reports = await Report.find({ studentId: student._id });

      const avg =
        reports.reduce((acc, r) => acc + (r.rating || 0), 0) /
        (reports.length || 1);

      leaderboard.push({
        name: student.name,
        avgRating: Number(avg.toFixed(2)),
      });
    }

    leaderboard.sort((a, b) => b.avgRating - a.avgRating);

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🤖 AI Skill Breakdown (basic)
export const getSkillBreakdown = async (req, res) => {
  try {
    const reports = await Report.find({ studentId: req.user._id });

    let skills = {
      frontend: 0,
      backend: 0,
      problemSolving: 0,
    };

    reports.forEach((r) => {
      const text = r.content.toLowerCase();

      if (text.includes("react") || text.includes("ui")) skills.frontend++;
      if (text.includes("api") || text.includes("node")) skills.backend++;
      if (text.includes("logic") || text.includes("problem")) skills.problemSolving++;
    });

    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};