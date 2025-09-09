import express from "express";
import multer from "multer";
import fs from "fs";
import pdfParse from "pdf-parse/lib/pdf-parse.js";   // 👈 direct import
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors({
  origin: "http://localhost:5173", // frontend URL (Vite default)
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// Ensure uploads folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-z0-9.]/gi, "_");
    cb(null, Date.now() + "-" + safeName);
  },
});
const upload = multer({ storage });

function parseResume(rawText) {
  const resume = {};

  // Extract name (first line usually)
  const nameMatch = rawText.match(/^\s*([A-Z\s]+)\n/);
  resume.name = nameMatch ? nameMatch[1].trim() : null;

  // Role (e.g., Developer)
  const roleMatch = rawText.match(/\n([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)\n/);
  resume.role = roleMatch ? roleMatch[1] : null;

  // Email
  const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
  resume.email = emailMatch ? emailMatch[0] : null;

  // Phone
  const phoneMatch = rawText.match(/(\+91)?\s?\d{10}/);
  resume.phone = phoneMatch ? phoneMatch[0] : null;

  // Location (take first line with city)
  const locationMatch = rawText.match(/Greater Noida|Delhi|Gorakhpur/);
  resume.location = locationMatch ? locationMatch[0] : null;

  // Summary
  const summaryMatch = rawText.match(/SUMMARY([\s\S]*?)TECHNICAL SKILLS/);
  resume.summary = summaryMatch ? summaryMatch[1].trim().replace(/\n+/g, " ") : null;

  // Technical Skills
  const techMatch = rawText.match(/TECHNICAL SKILLS([\s\S]*?)PROFESSIONAL SKILLS/);
  resume.technical_skills = techMatch ? techMatch[1].split(/,|\n/).map(s => s.trim()).filter(Boolean) : [];

  // Professional Skills
  const profMatch = rawText.match(/PROFESSIONAL SKILLS([\s\S]*?)EDUCATION/);
  resume.professional_skills = profMatch ? profMatch[1].split(/,|\n/).map(s => s.trim()).filter(Boolean) : [];

  // Education
  const eduMatch = rawText.match(/EDUCATION([\s\S]*?)PROJECT/);
  if (eduMatch) {
    resume.education = eduMatch[1].trim().split("\n").filter(Boolean);
  }

  // Projects
  const projMatch = rawText.match(/PROJECT([\s\S]*?)EXPERIENCE/);
  resume.projects = projMatch ? projMatch[1].trim().split("\n").filter(Boolean) : [];

  // Experience
  const expMatch = rawText.match(/EXPERIENCE([\s\S]*?)ADDITIONAL INFORMATION/);
  resume.experience = expMatch ? expMatch[1].trim().split("\n").filter(Boolean) : [];

  // Additional Info
  const addMatch = rawText.match(/ADDITIONAL INFORMATION([\s\S]*)/);
  resume.additional_information = addMatch ? addMatch[1].trim().split("\n").filter(Boolean) : [];

  return resume;
}


app.post("/upload-resume", upload.single("pdf"), async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    // console.log("File uploaded:", req.file.path);
    const pdfData = await pdfParse(dataBuffer);

    // console.log("Parsed PDF data:", pdfData.text);
    const structuredResume = parseResume(pdfData.text);

    // console.log("Structured Resume:", structuredResume);
    res.json(structuredResume);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error parsing resume");
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
