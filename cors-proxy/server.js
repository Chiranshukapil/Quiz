const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the Quiz API! Use /api/quiz to get quiz data.');
});

app.get('/api/quiz', async (req, res) => {
  try {
    const response = await axios.get('https://api.jsonserve.com/Uw5CrX');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.listen(PORT, () => {
  console.log(`CORS Proxy running on http://localhost:${PORT}`);
});