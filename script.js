const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const card = document.querySelector(".card");
const unitToggle = document.getElementById("unit-toggle");
const tempElement = document.querySelector(".temp");

let currentTempCelsius = 0;
let isCelsius = true;

console.log("API Key Terdeteksi:", apiKey ? "Ya" : "Tidak");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) throw new Error("Kota tidak ditemukan");
        
        const data = await response.json();
        console.log("Data dari API:", data);

        currentTempCelsius = Math.round(data.main.temp);
        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        updateTempDisplay();
        
        const condition = data.weather[0].main;
        const icons = {"Clouds":"03d", "Clear":"01d", "Rain":"10d", "Drizzle":"09d", "Mist":"50d"};
        weatherIcon.src = `https://openweathermap.org/img/wn/${icons[condition] || "01d"}@2x.png`;
        
    } catch (err) {
        alert(err.message);
    }
}

function updateTempDisplay() {
    if (isCelsius) {
        tempElement.innerHTML = currentTempCelsius;
        unitToggle.innerHTML = "°C";
    } else {
        const fahrenheit = Math.round((currentTempCelsius * 9/5) + 32);
        tempElement.innerHTML = fahrenheit;
        unitToggle.innerHTML = "°F";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

unitToggle.addEventListener("click", () => {
    console.log("Tombol Satuan Diklik!");
    isCelsius = !isCelsius;
    updateTempDisplay();
});