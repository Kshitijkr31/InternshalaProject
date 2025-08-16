import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Groq from 'groq-sdk';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/summarize", async (req, res) => {
  try {
    const { transcript, prompt } = req.body;

    const response = await groq.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        { role: "system", content: "You are a meeting summarizer." },
        { role: "user", content: `${prompt}\n\nTranscript:\n${transcript}` },
      ],
    });

    res.json({ summary: response.choices[0].message.content });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "AI request failed" });
  }
});

// ✅ Route: Send Summary via Email
app.post("/send-email", async (req, res) => {
  try {
    const { summary, recipient } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: "Meeting Summary",
      text: summary,
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Email sending failed" });
  }
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
