const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const videoRoutes = require('../Ai video tools/server/routes/video');
const editorRoutes = require('./routes/editor');

app.use('/api/video', videoRoutes);
app.use('/api/editor', editorRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));


const editorRoutes = require('./routes/editor');
app.use('/api/editor', editorRoutes);

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173', // your frontend port
}));
   
 const dashboardRoutes = require('./routes/dashboard');
app.use('/api/dashboard', dashboardRoutes);