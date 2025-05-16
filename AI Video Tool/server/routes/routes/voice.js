const express = require('express');
const axios = require('axios');
const queue = require('../utils/requestQueue');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.post('/generate-voice', async (req, res) => {
  try {
    const { text, voice = "Rachel", stability = 0.75, similarity_boost = 0.75 } = req.body;

    const outputFile = path.join(__dirname, `../outputs/${Date.now()}-voice.mp3`);

    const result = await queue.add(() =>
      axios({
        method: 'post',
        url: `https://api.elevenlabs.io/v1/text-to-speech/${voice}`,
        data: {
          text,
          voice_settings: {
            stability,
            similarity_boost,
          },
        },
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
        },
        responseType: 'stream',
      })
    );

    // Save the voice output to a file
    const writer = fs.createWriteStream(outputFile);
    result.data.pipe(writer);

    writer.on('finish', () => {
      res.json({ file: `/outputs/${path.basename(outputFile)}` });
    });

    writer.on('error', (err) => {
      console.error('Error writing audio file:', err);
      res.status(500).json({ error: 'Failed to write voice file' });
    });

  } catch (err) {
    console.error('Voice generation error:', err);
    res.status(500).json({ error: 'Voice generation failed' });
  }
});

module.exports = router;