const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const router = express.Router();

router.post('/trim', async (req, res) => {
  const { videoUrl, startTime, endTime } = req.body;

  if (!videoUrl || startTime === undefined || endTime === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const inputPath = path.join(__dirname, '../uploads/input-video.mp4');
  const outputFilename = `trimmed-${Date.now()}.mp4`;
  const outputPath = path.join(__dirname, '../uploads', outputFilename);

  // Download video from URL to inputPath
  const https = require('https');
  const file = fs.createWriteStream(inputPath);

  https.get(videoUrl, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close(() => {
        const duration = endTime - startTime;
        const ffmpegCmd = `ffmpeg -i "${inputPath}" -ss ${startTime} -t ${duration} -c:v libx264 -c:a aac -strict experimental "${outputPath}"`;

        exec(ffmpegCmd, (error) => {
          fs.unlinkSync(inputPath); // clean up input

          if (error) {
            console.error('FFmpeg error:', error);
            return res.status(500).json({ error: 'Trimming failed' });
          }

          res.json({ trimmedUrl: \`/uploads/\${outputFilename}\` });
        });
      });
    });
  }).on('error', (err) => {
    fs.unlinkSync(inputPath);
    res.status(500).json({ error: 'Video download failed' });
  });
});

module.exports = router;