import Submission from "../DB/SubmissionModel.js";

const buildPrompt = (rows) => {
  const compact = rows.map((r) => ({
    region: r.region,
    activity: r.activityType,
    participants: r.participantsCount,
    issue: r.majorIssue,
    date: r.dateConducted,
  }));
  return `You are an analyst for an NGO. Given these field reports (JSON), write a short summary (max 8 sentences) covering:
- total activities and participants
- top regions and activity types
- most common issues
- 2 short insight suggestions (e.g. "Region X has low engagement")
Keep it plain, no markdown.

DATA:
${JSON.stringify(compact)}`;
};

const callOpenAI = async (prompt) => {
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error?.message || "OpenAI error");
  return j.choices?.[0]?.message?.content?.trim();
};

const callGemini = async (prompt) => {
  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  );
  const j = await r.json();
  if (!r.ok) throw new Error(j.error?.message || "Gemini error");
  return j.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
};

export const generateSummary = async (_req, res) => {
  const rows = await Submission.find().sort({ createdAt: -1 }).limit(200);
  if (!rows.length) return res.json({ summary: "No reports yet." });

  const prompt = buildPrompt(rows);
  try {
    let summary;
    if (process.env.OPENAI_API_KEY) summary = await callOpenAI(prompt);
    else if (process.env.GEMINI_API_KEY) summary = await callGemini(prompt);
    else return res.status(400).json({ message: "Set OPENAI_API_KEY or GEMINI_API_KEY in .env" });
    res.json({ summary });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
