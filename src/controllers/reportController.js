import Report from "../models/Report.js";
import openai from "../config/openai.js";

// 🔥 Submit Report + AI Analysis
export const submitReport = async (req, res) => {
  try {
    const { content } = req.body;

    // 🤖 AI Analysis
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "You are a trainer analyzing student internship reports.",
        },
        {
          role: "user",
          content: `Analyze this report and give feedback + rating (out of 10): ${content}`,
        },
      ],
    });

    const aiText = aiResponse.choices[0].message.content;

    // simple rating extract (basic)
    const ratingMatch = aiText.match(/\d+/);
    const rating = ratingMatch ? parseInt(ratingMatch[0]) : 5;

    const report = await Report.create({
      studentId: req.user._id,
      content,
      aiFeedback: aiText,
      rating,
    });

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Trainer reviews (optional update)
export const reviewReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    report.status = "reviewed";

    await report.save();

    res.json({ message: "Report reviewed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};