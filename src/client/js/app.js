const handleSubmit = async function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    const destination = document.getElementById("destination").value;
    const date = document.getElementById("date").value;
    const today = new Date().toISOString().split("T")[0];

    if (date <= today) alert("Enter A future Date!");
    else {
        const remainDays = getRdays(date);
        const Geo = await getGeo(destination);
        console.log(Geo);
        if (Geo.geonames[0].name.toLowerCase() != destination.toLowerCase()) {
            alert("Enter A valid City or Check the spelling");
        } else {
            const Weather = await getWeatherData(
                Geo.geonames[0].lat,
                Geo.geonames[0].lng,
                remainDays
            );
            const picture = await getPicture(destination);
            UpdateUI(
                Geo.geonames[0].name,
                date,
                remainDays,
                Weather.data[0].app_max_temp,
                Weather.data[0].app_min_temp,
                Weather.data[0].weather.description,
                picture.hits[0].webformatURL
            );
        }
    }
};

//~<><><><><><><><><><><><><><><><><><> the Fucntions <><><><><><><><><><><><><><><><><><><>

const getGeo = async (dest) => {
    const city = {
        city: dest,
    };
    try {
        const response = await fetch("http://localhost:8000/getGeo", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(city),
        });
        if (!response.ok) {
            throw new Error(`Htpp Error ! : ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Fetch City Error", error);
    }
};
const getWeatherData = async (lat, lng, rdays) => {
    const weatherRequset = {
        lat: lat,
        lng: lng,
        RemainDays: rdays,
    };
    try {
        const response = await fetch("http://localhost:8000/getWeather", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(weatherRequset),
        });
        if (!response.ok) {
            throw new Error(`Htpp Error ! : ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Fetch Weather Error", error);
    }
};
const getPicture = async (dest) => {
    const city = {
        city: dest,
    };
    try {
        const response = await fetch("http://localhost:8000/getPixabay", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(city),
        });
        if (!response.ok) {
            throw new Error(`Htpp Error ! : ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Fetch City Error", error);
    }
};
//
const getRdays = (date) => {
    const currentDate = new Date();
    const endDate = new Date(date);
    const differenceInTime = endDate.getTime() - currentDate.getTime();
    const remainingDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
    return remainingDays;
};
//-------------------------- Upadte the UI ---------------------
const UpdateUI = (
    city,
    date,
    rDays,
    maxTemp,
    minTemp,
    weatherDesc,
    picture
) => {
    document.querySelector(".results").innerHTML = `
         <div class="image-display"><img src="${picture}" alt="${city}"></div>
                <div class="weather-info">
                    <h3 class="city">My trip to : ${city}</h3>
                    <h3 class="date">Departing : ${date}</h3>
                    <h3 class="Rdays">${city} is ${rDays} days away</h3>
                    <h4 class="Temp">High : ${maxTemp} , low : ${minTemp}</h4>
                    <h4 class="weatherDesc">${weatherDesc}</h4>
                </div>
    `;
};
//~<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
export { handleSubmit };
