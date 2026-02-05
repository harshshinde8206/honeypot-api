const express = require("express");

const app = express();

// REQUIRED to read JSON body
app.use(express.json());

app.post("/honeypot", (req, res) => {
  const body = req.body;

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

  return res.json({
    status: "success",
    reply: "Why is my account being suspended?"
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🍯 Honeypot API running on port ${PORT}`);
});
