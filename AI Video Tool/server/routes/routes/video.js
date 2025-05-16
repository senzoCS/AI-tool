// server/routes/video.js
const express = require('express');
const axios = require('axios');
const queue = require('../utils/requestQueue');

const router = express.Router();

router.post('/generate-video', async (req, res) => {
  try {
    const { prompt } = req.body;

    const result = await queue.add(() =>
      axios.post('https://api.runwayml.com/generate', {
        prompt,
      }, {
        headers: { Authorization: `Bearer ${process.env.RUNWAY_API_KEY}` }
      })
    );

    res.json(result.data);
  } catch (err) {
    console.error('Video generation error:', err);
    res.status(500).json({ error: 'Failed to generate video' });
  }
});

module.exports = router;
