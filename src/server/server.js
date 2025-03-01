// Import required dependencies
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
// const cheerio = require("cheerio");
const cors = require("cors");
const port = 8000;
// Initialize the Express application
const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.static("dist")); // Serve built files from 'dist'
const WeatherKey = "b8a96bc4809a45b7a0f936b34dadf9ef";
const pixKey = "48867060-616a97a9c257d90101d75173a";
const { getCityData } = require("./functions"); // Import function from functions.js
const { getWeatherData } = require("./functions");
const { getImage } = require("./functions");

//~ <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Post Routes >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//------------------------------> Post here <-------------------------
app.post("/getGeo", async (req, res) => {
    try {
        const city = req.body.city;
        const cityData = await getCityData(city);
        if (!cityData) {
            return res.status(500).json({ error: "Failed to fetch city data" });
        }
        // console.log(cityData.geonames[0].lng);
        res.send(cityData);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/getWeather", async (req, res) => {
    try {
        const { lat, lng, RemainDays } = req.body;
        const weatherData = await getWeatherData(
            lat,
            lng,
            RemainDays,
            WeatherKey
        );
        if (!weatherData) {
            return res.status(500).json({ error: "Failed to fetch city data" });
        }
        // console.log(weatherData.data[0]. app_max_temp);
        // console.log(weatherData.data[0]. app_min_temp);
        // console.log(weatherData.data[0].weather.description);
        res.send(weatherData);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
app.post("/getPixabay", async (req, res) => {
    try {
        const city = req.body.city;
        if (!city) {
            return res.status(500).json({ error: "Failed to fetch city data" });
        }
        const image = await getImage(pixKey, city);
        // hits[0].webformatURL  || largeImageURL
        res.send(image);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
//~ <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.get("/", (req, res) => {
    res.render("index.html");
});

// Start the server
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

module.exports = { app };
