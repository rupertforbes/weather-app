function dayConverter(newDay) {
  if (newDay > 6) {
    newDay = newDay - 7;
  }
  for (let i = 0; i < days.length; i++) {
    if (days[i].number === newDay) {
      return days[i].day;
    }
  }
}

//Date and time

let days = [
  {
    number: 0,
    day: "Sun",
  },
  {
    number: 1,
    day: "Mon",
  },
  {
    number: 2,
    day: "Tue",
  },
  {
    number: 3,
    day: "Wed",
  },
  {
    number: 4,
    day: "Thu",
  },
  {
    number: 5,
    day: "Fri",
  },
  {
    number: 6,
    day: "Sat",
  },
];

function dateAndTime(dt) {
  let now = new Date(dt);
  let day = now.getDay();
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  let amPm = "PM";

  for (let i = 0; i < days.length; i++) {
    if (days[i].number === day) {
      day = days[i].day;
    }
  }

  if (hour > 12) {
    hour = hour - 12;
  } else {
    amPm = "AM";
  }

  let dateTime = document.querySelector(".date-and-time");
  dateTime.innerHTML = `${day} ${hour}:${minute} ${amPm}`;
}

//Updating forecast

function displayForecast(response) {
  let dt = response.data.daily[0].time * 1000;
  let date = new Date(dt);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row bottom-row">`;

  for (let i = 0; i < 5; i++) {
    let day = date.getDay() + 1 + i;
    if (day > 6) {
      day = day - 7;
    }
    day = days[day].day;

    let weatherType = response.data.daily[1 + i].condition.icon;
    let icon;
    if (weatherType === "clear-sky-day") {
      icon = "☀";
    } else if (
      weatherType === "few-clouds-day" ||
      weatherType === "scattered-clouds-day"
    ) {
      icon = "⛅";
    } else if (weatherType === "broken-clouds-day") {
      icon = "☁";
    } else if (weatherType === "shower-rain-day") {
      icon = "🌦";
    } else if (weatherType === "rain-day") {
      icon = "🌧";
    } else if (weatherType === "thunderstorm-day") {
      icon = "⛈";
    } else if (weatherType === "snow-day") {
      icon = "🌨";
    } else if (weatherType === "mist-day") {
      icon = "🌫";
    }

    let maxTemp = Math.round(response.data.daily[1 + i].temperature.maximum);
    let minTemp = Math.round(response.data.daily[1 + i].temperature.minimum);

    forecastHTML =
      forecastHTML +
      `
        <div class="col bottom">
            <p class="forecast1-day">${day}</p>
            <p><span class="bottom-icon">${icon}</span></p>
            <p><span class="max-temp">${maxTemp}°</span><span class="min-temp"> ${minTemp}°</span></p>
        </div>
    `;
  }
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let longitude = coordinates.lon;
  let latitude = coordinates.lat;
  let apiKey = "b5a70e3dbaf3379o5576fffe161ca0t4";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

//Updating weather data

let icons = [
  {
    type: "Thunderstorm",
    icon: "⛈",
  },
  {
    type: "Drizzle",
    icon: "🌦",
  },
  {
    type: "Clear",
    icon: "☀",
  },
  {
    type: "Rain",
    icon: "🌧",
  },
  {
    type: "Snow",
    icon: "🌨",
  },
  {
    type: "Clouds",
    icon: {
      light: "⛅",
      heavy: "☁",
    },
  },
];

function showUser(response) {
  //city
  let changedCity = document.querySelector(".city");
  changedCity.innerHTML = `${response.data.name}`;

  //temperature
  let temp = Math.round(response.data.main.temp);
  let newTemp = document.querySelector(".temp");
  newTemp.innerHTML = temp + "°C";
  temperature = newTemp.innerHTML;
  convertButton.innerHTML = "Convert to °F";
  getFahrenheit();
  isCelsius = true;

  //icon and weather type
  let weatherType = response.data.weather[0].main;
  let iconElement = document.querySelector(".icon");
  for (let i = 0; i < icons.length; i++) {
    if (weatherType === "Clouds") {
      if (
        response.data.weather[0].description === "few clouds" ||
        response.data.weather[0].description === "scattered clouds"
      ) {
        iconElement.innerHTML = icons[5].icon.light;
      } else if (
        response.data.weather[0].description === "broken clouds" ||
        response.data.weather[0].description === "overcast clouds"
      ) {
        iconElement.innerHTML = icons[5].icon.heavy;
      }
    } else if (weatherType === icons[i].type) {
      iconElement.innerHTML = icons[i].icon;
    }
  }

  //Weather description
  let weatherDescription = response.data.weather[0].description;
  weatherDescription = weatherDescription.split(" ");

  for (let i = 0; i < weatherDescription.length; i++) {
    weatherDescription[i] =
      weatherDescription[i][0].toUpperCase() + weatherDescription[i].substr(1);
  }

  weatherDescription = weatherDescription.join(" ");
  let weatherDescriptionDestination = document.querySelector(".weather-type");
  weatherDescriptionDestination.innerHTML = weatherDescription;

  //Humidity
  let humidityElement = document.querySelector(".humidity");
  let newHumidity = response.data.main.humidity;
  humidityElement.innerHTML = `Humidity: ${newHumidity}%`;

  //Wind speed
  let windSpeedElement = document.querySelector(".wind");
  let newWindSpeed = Math.round(response.data.wind.speed * 10) / 10;
  windSpeedElement.innerHTML = `Wind: ${newWindSpeed}km/h`;

  //date and time
  let dt = response.data.dt * 1000;
  dateAndTime(dt);

  //call forecast function
  getForecast(response.data.coord);
}

function startingCityFunction(event) {
  let apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
  let url = "https://api.openweathermap.org/data/2.5/weather?q=";
  let startingCity = "London";
  let apiUrl = url + startingCity + "&units=metric&appid=" + apiKey;
  axios.get(apiUrl).then(showUser);
}

startingCityFunction();

function newCityFunction(event) {
  event.preventDefault();
  let apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
  let url = "https://api.openweathermap.org/data/2.5/weather?q=";
  let newCity = searchBar.value;
  let apiUrl = `${url}${newCity}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showUser);
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
  let unit = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(url).then(showUser);
}

function newCityByLocation(position) {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let searchBar = document.querySelector(".input");
let searchButton = document.querySelector(".search");
let searchForm = document.querySelector(".search-form");
let currentLocation = document.querySelector(".locator");
currentLocation.addEventListener("click", newCityByLocation);
searchForm.addEventListener("submit", newCityFunction);
searchButton.addEventListener("click", newCityFunction);

// C to F Converter

function conversion(event) {
  event.preventDefault();
  if (isCelsius === true) {
    getFahrenheit();
    temperatureElement.innerHTML = fahrenheit;
    convertButton.innerHTML = "Convert to °C";
    isCelsius = false;
  } else {
    temperatureElement.innerHTML = celsiusNumber + "°C";
    convertButton.innerHTML = "Convert to °F";
    isCelsius = true;
  }
}

function getFahrenheit() {
  tempLength = temperature.length;
  tempLength = tempLength - 2;
  celsiusNumber = Number(temperature.slice(0, tempLength));
  fahrenheitNumber = celsiusNumber * 1.8 + 32;
  fahrenheit = fahrenheitNumber + "°F";
}

let temperatureElement = document.querySelector(".temp");
let temperature = temperatureElement.innerHTML;
let celsius = temperature;
let celsiusNumber;
let tempLength;
let fahrenheitNumber;
let fahrenheit;
let convertButton = document.querySelector(".converter");
let isCelsius = true;

convertButton.addEventListener("click", conversion);
