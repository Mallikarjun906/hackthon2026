import openai from "../config/openai.js";

// MCQ
export const generateMCQ = async (req, res) => {
  const { domain } = req.body;

  const ai = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: `Generate MCQ for ${domain}` }],
  });

  res.json({ questions: ai.choices[0].message.content });
};

// Roadmap
export const roadmap = async (req, res) => {
  const { domain } = req.body;

  const ai = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: `Roadmap for ${domain}` }],
  });

  res.json({ roadmap: ai.choices[0].message.content });
};