async function getWeather()
{
    let city = document.getElementById("city").value;

    let apiKey = "215eb1a2765a9fd2f98d3fda95692ca9";

    let url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    let response = await fetch(url);

    let data = await response.json();

    // Error Handling
    if(data.cod == 404)
    {
        document.getElementById("result").innerHTML =
        "<h3>❌ City Not Found!</h3>";

        return;
    }

    let weatherMain = data.weather[0].main;
    let iconCode = data.weather[0].icon;

    let weatherEmoji = "🌤️";

    if(weatherMain === "Clear")
    {
        if(iconCode.includes("n"))
        {
            weatherEmoji = "🌙";
        }
        else
        {
            weatherEmoji = "☀️";
        }
    }
    else if(weatherMain === "Clouds")
    {
        weatherEmoji = "☁️";
    }
    else if(weatherMain === "Rain")
    {
        weatherEmoji = "🌧️";
    }
    else if(weatherMain === "Thunderstorm")
    {
        weatherEmoji = "⛈️";
    }
    else if(weatherMain === "Snow")
    {
        weatherEmoji = "❄️";
    }

    document.getElementById("result").innerHTML =
    `
    <div class="weather-card">

        <h2>${data.name}</h2>

        <h1>${weatherEmoji}</h1>

        <p>${data.weather[0].description}</p>

        <h3>${data.main.temp} °C</h3>

        <p>Humidity: ${data.main.humidity}%</p>

        <p>Feels Like: ${data.main.feels_like} °C</p>

        <p>Wind Speed: ${data.wind.speed} m/s</p>

    </div>
    `;
}

document.getElementById("city")
.addEventListener("keypress", function(event)
{
    if(event.key === "Enter")
    {
        getWeather();
    }
});