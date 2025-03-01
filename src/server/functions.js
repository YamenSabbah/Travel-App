// functions.js

const username = "yamen"; // Replace with your actual GeoNames username

const getCityData = async (city) => {
    try {
        const response = await fetch(
            `http://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=${username}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching city data:", error);
        return null;
    }
};
const getWeatherData = async (lat, lng, remainDays, key) => {
    try {
        const response = await fetch(
            `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&units=M&days=${remainDays}&key=${key}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};
const getImage = async (pixkey, city) => {
    try {
        const response = await fetch(
            `https://pixabay.com/api/?key=${pixkey}&q=${city}&image_type=photo`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching image :", error);
        return null;
    }
};

// Export the function so it can be used in other files
module.exports = { getCityData, getWeatherData, getImage };
