const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.get('/welcome', async (req, res) => {
  const userName = req.query.name || 'Creator';

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a friendly creative assistant helping content creators brainstorm ideas." },
        { role: "user", content: `Greet me like a friendly AI assistant and give 5 unique, fun YouTube video ideas for my channel.` },
      ],
      temperature: 0.8,
    });

    const message = response.data.choices[0].message.content;
    res.json({ welcomeMessage: `Welcome back, ${userName}!`, ideas: message });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "Failed to fetch ideas" });
  }
});

module.exports = router;