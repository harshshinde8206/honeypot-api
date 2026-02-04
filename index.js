const express = require("express");
const app = express();

app.use(express.json({ limit: "10mb" }));

const API_KEY = "test123";

app.get("/", (req, res) => {
  res.json({ status: "Honeypot API running" });
});
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== API_KEY) {
    return res.status(401).json({ error: "INVALID_API_KEY" });
  }

  const {
    language,
    audio_format,
    audio_base64,
    message,
    sessionId,
    metadata
  } = req.body;

  if (!language || !audio_format || !audio_base64) {
    return res.status(400).json({ error: "INVALID_REQUEST_BODY" });
  }

  console.log("🔥 Honeypot triggered");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  const intelligence = {
    scam_type: "banking_fraud",
    urgency: "high",
    indicators: ["otp_request", "urgent_language"]
  };

  console.log("Extracted intelligence:", intelligence);

  res.status(200).json({});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🍯 Honeypot API running on port ${PORT}`);
});
