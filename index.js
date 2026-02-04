const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 10000;

// Health check (so browser works)
app.get("/", (req, res) => {
  res.json({ status: "Honeypot API running" });
});

// Honeypot endpoint
app.post("/honeypot", (req, res) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({
      error: "Missing API key"
    });
  }

  const { language, audio_format, audio_base64 }
