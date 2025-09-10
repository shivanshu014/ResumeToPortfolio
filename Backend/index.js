import express from "express";
import multer from "multer";
import fs from "fs";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const port = 3000;

// Enable CORS for your frontend
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// Ensure uploads folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-z0-9.]/gi, "_");
    cb(null, Date.now() + "-" + safeName);
  },
});
const upload = multer({ storage });

// Gemini setup
const genAI = new GoogleGenerativeAI("AIzaSyAPJmTx4QkMENXQqwVbNTREOnqi_LqTYhU");

app.post("/upload-resume", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Read PDF text
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);

    // Prompt for AI to parse resume
    const prompt = `
You are a resume parser. 
Extract the following fields from the resume text and return a valid JSON object strictly following this schema:

{
  "personal_details": {
    "name": "string",
    "title": "string",
    "location": "string",
    "email": "string",
    "phone": "string",
    "links": ["string"]
  },
  "summary": "string",
  "skills": {
    "technical_skills": ["string"],
    "professional_skills": ["string"]
  },
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "year": "string"
    }
  ],
  "projects": [
    {
      "title": "string",
      "description": "string"
    }
  ],
  "experience": [
    {
      "company": "string",
      "role": "string",
      "duration": "string",
      "description": "string"
    }
  ],
  "additional_information": {
    "languages": ["string"],
    "certifications_achievements": ["string"]
  }
}

Rules:
- Always return valid JSON.
- Use empty string "" or empty array [] for missing data.
- Do NOT include any explanations, only JSON.

Resume text:
${pdfData.text}
`;

    // Generate content from Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    let responseText = result.response.text();

    // Remove any markdown code blocks
    responseText = responseText.replace(/```json/g, "")
                               .replace(/```/g, "")
                               .trim();

    // Parse AI JSON
    let parsedResume;
    try {
      parsedResume = JSON.parse(responseText);
    } catch (err) {
      console.error("Failed to parse AI response:", err);
      console.log("AI raw output:", responseText); // Debug AI output
      return res.status(500).json({ error: "Invalid JSON from AI" });
    }
    // Delete PDF after processing
    fs.unlinkSync(req.file.path);

    // Send parsed JSON to frontend
    res.json({ data: parsedResume });

  } catch (err) {
    console.error("Upload/Parsing error:", err);
    res.status(500).json({ error: "Error processing resume" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
