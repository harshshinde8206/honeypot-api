import express from "express";

const app = express();

// 🔴 REQUIRED — without this req.body is undefined
app.use(express.json());

app.post("/honeypot", (req, res) => {
  const body = req.body;

  // Basic validation (must match tester payload)
  if (
    !body ||
    !body.sessionId ||
    !body.message ||
    !body.message.text
  ) {
    return res.status(400).json({
      error: "INVALID_REQUEST_BODY"
    });
  }

  // Honeypot-style reply
  return res.json({
    status: "success",
    reply: "Why is my account being suspended?"
  });
});

// Render requires PORT binding
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🍯 Honeypot API running on port ${PORT}`);
});
