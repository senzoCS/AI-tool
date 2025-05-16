// server.js

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (if any)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Example route
app.get('/', (req, res) => {
  res.send('AI Video Creation Backend is running ✅');
});

// Upload route (for images/audio/etc.)
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded', file: req.file });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
