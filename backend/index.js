const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

//define routes
app.get('/weather', async (req, res) => {
  try {
    const { lat, lon } = req.query; // Latitude and longitude from frontend
    const response = await axios.get(process.env.weatherUrl, {
      params: {
        lat,
        lon,
        appid: process.env.apiKey,
        units: 'metric' // For Celsius, you can change it to 'imperial' for Fahrenheit
      }
    });
    const weatherData = response.data;
    res.json(weatherData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//start server

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

