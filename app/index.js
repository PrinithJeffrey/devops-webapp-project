const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const API_KEY = '52502daed4bdf7e57a4d2bc1ef103bb4'; // Your API key hardcoded for simplicity

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    // No city specified, just render the form
    return res.render('index', { weather: null, error: null });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(url);
    const data = response.data;

    const weather = {
      city: data.name,
      temp: data.main.temp,
      desc: data.weather[0].description,
      humidity: data.main.humidity,
      icon: data.weather[0].icon,
    };

    res.render('index', { weather, error: null });
  } catch (err) {
    res.render('index', { weather: null, error: "City not found!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
