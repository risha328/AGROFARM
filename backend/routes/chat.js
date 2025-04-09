const express = require("express");
const router = express.Router();
const axios = require("axios");

// Option 1: OpenRouter (Free GPT-3.5 via OpenRouter.ai)
const OPENROUTER_API_KEY = "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";

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("AI API Error:", error.response?.data || error.message);
    res.status(500).json({ reply: "Sorry, I couldn't get a response." });
  }
});

module.exports = router;
