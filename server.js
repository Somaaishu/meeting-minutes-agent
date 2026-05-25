const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();
 
const app = express();
const upload = multer({ dest: "uploads/" });
 
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
 
function buildPrompt(transcript) {
  return `
You are an expert meeting assistant. Analyze the following meeting transcript and produce structured meeting minutes.
 
TRANSCRIPT:
"""
${transcript}
"""
 
Return your response in this EXACT JSON format:
{
  "summary": "2-3 sentence overview of the meeting",
  "attendees": ["name1", "name2"],
  "keyPoints": ["point 1", "point 2", "point 3"],
  "decisions": ["decision 1", "decision 2"],
  "actionItems": [
    { "task": "task description", "owner": "person name", "deadline": "date or ASAP" }
  ],
  "nextMeeting": "date/time or null"
}
 
Return ONLY the JSON object, no markdown, no extra text.
`;
}
 
app.post("/api/process", async (req, res) => {
  try {
    const { transcript } = req.body;
    if (!transcript) return res.status(400).json({ error: "No transcript provided" });
 
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(buildPrompt(transcript));
    const text = result.response.text();
    const cleaned = text.replace(/```json|```/g, "").trim();
    const minutes = JSON.parse(cleaned);
 
    res.json({ success: true, minutes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
 
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
 
    const transcript = fs.readFileSync(req.file.path, "utf8");
    fs.unlinkSync(req.file.path);
 
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(buildPrompt(transcript));
    const text = result.response.text();
    const cleaned = text.replace(/```json|```/g, "").trim();
    const minutes = JSON.parse(cleaned);
 
    res.json({ success: true, minutes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));