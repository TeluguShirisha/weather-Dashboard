const API_KEY = "c3def99d9bc6fd63a595b989424be563";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherCard = document.getElementById("weatherCard");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const weatherIcon = document.getElementById("weatherIcon");

const loading = document.getElementById("loading");
const error = document.getElementById("error");

async function getWeather(city){

    try{

        loading.style.display = "block";
        weatherCard.style.display = "none";
        error.textContent = "";

        const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message);
        }

        cityName.textContent =
            `${data.name}, ${data.sys.country}`;

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;

        description.textContent =
            data.weather[0].description;

        humidity.textContent =
            `${data.main.humidity}%`;

        wind.textContent =
            `${data.wind.speed} m/s`;

        feelsLike.textContent =
            `${Math.round(data.main.feels_like)}°C`;

        pressure.textContent =
            `${data.main.pressure} hPa`;

        visibility.textContent =
            `${data.visibility / 1000} km`;

        sunrise.textContent =
            new Date(
                data.sys.sunrise * 1000
            ).toLocaleTimeString();

        sunset.textContent =
            new Date(
                data.sys.sunset * 1000
            ).toLocaleTimeString();

        weatherIcon.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

        weatherCard.style.display = "block";

    }

    catch(err){

        error.textContent = err.message;

    }

    finally{

        loading.style.display = "none";
    }
}

searchBtn.addEventListener("click",()=>{

    const city = cityInput.value.trim();

    if(city===""){
        error.textContent =
            "Please enter a city name";
        return;
    }

    getWeather(city);
});

cityInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){
        searchBtn.click();
    }

});

setInterval(()=>{

    document.getElementById("dateTime")
    .textContent =
    new Date().toLocaleString();

},1000);

getWeather("Hyderabad");