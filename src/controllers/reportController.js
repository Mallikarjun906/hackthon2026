import Report from "../models/Report.js";
import openai from "../config/openai.js";

// Submit report
export const submitReport = async (req, res) => {
  const { week, content } = req.body;

  // AI Analysis
  const ai = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "user", content: `Analyze report: ${content}` }
    ],
  });

  const report = await Report.create({
    studentId: req.user._id,
    week,
    content,
    aiAnalysis: ai.choices[0].message.content,
  });

  res.json(report);
};

// Trainer review
export const reviewReport = async (req, res) => {
  const report = await Report.findById(req.params.id);
  report.status = "reviewed_by_trainer";
  await report.save();

  res.json(report);
};