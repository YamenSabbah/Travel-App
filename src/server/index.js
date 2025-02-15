// Import required dependencies
const express = require("express");
const bodyParser = require("body-parser");
// const axios = require("axios");
// const cheerio = require("cheerio");
// const cors = require("cors");
const port = 3000;
// Initialize the Express application
const app = express();

// 1  http://api.geonames.org/searchJSON?q=${city_geo}&maxRows=10&username=${username}
// 2 b8a96bc4809a45b7a0f936b34dadf9ef for https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${weather_key}&include=minutely
// 3 48867060-616a97a9c257d90101d75173a for https://pixabay.com/api/?key=${pixbay_key}&q=${city_pix}&image_type=photo
// Apply middleware
// app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies

// Encapsulated function to scrape text from a URL
//------------------------------> Post here
app.post("/getGeo", async (req, res) => {
    try {
        const response = await fetch(
            `http://api.geonames.org/searchJSON?q=${req.body.city}&maxRows=10&username=`
        );
        const data = response.json();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send("an error occurred!");
    }
});

// Default route
app.get("/", (req, res) => {
    res.send(
        "This is the server API page. You may access its services via the client app."
    );
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
