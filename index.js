const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.json({ status: "Honeypot API running" });
});

app.post("/honeypot", (req, res) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({ error: "Missing API key" });
  }

  const { language, audio_format, audio_base64 } = req.body;

  if (!language || !audio_format || !audio_base64) {
    return res.status(400).json({ error: "INVALID_REQUEST_BODY" });
  }

  res.json({
    status: "captured",
    intel: {
      language,
      audio_format,
      audio_length: audio_base64.length,
      api_key_used: apiKey
    }
  });
});

app.listen(PORT, () => {
  console.log(`🍯 Honeypot API running on port ${PORT}`);
});
