const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.OPENWEATHER_API_KEY; // store in GitHub secret

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/weather', async (req, res) => {
  const city = req.body.city;
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(url);
    const data = response.data;
    res.render('result', {
      city: data.name,
      temp: data.main.temp,
      desc: data.weather[0].description,
      humidity: data.main.humidity,
      icon: data.weather[0].icon
    });
  } catch (err) {
    res.render('result', { city: null, error: "City not found!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
