require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');

const carsRouter = require('./routes/cars');
const videosRouter = require('./routes/videos');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/cars', carsRouter);
app.use('/api/videos', videosRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`AutoCompare server running on http://localhost:${PORT}`);
});
