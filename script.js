//Search bar

/*let cities = [
  {
    city: "Berlin",
    temperature: 15,
    unit: { celsius: "°C", fahrenheit: "°F" },
    humidity: "70%",
  },
  {
    city: "London",
    temperature: 24,
    unit: { celsius: "°C", fahrenheit: "°F" },
    humidity: "75%",
  },
  {
    city: "Paris",
    temperature: 26,
    unit: { celsius: "°C", fahrenheit: "°F" },
    humidity: "80%",
  },
  {
    city: "Madrid",
    temperature: 30,
    unit: { celsius: "°C", fahrenheit: "°F" },
    humidity: "90%",
  },
  {
    city: "Rome",
    temperature: 28,
    unit: { celsius: "°C", fahrenheit: "°F" },
    humidity: "85%",
  },
  {
    city: "Lisbon",
    temperature: 27,
    unit: { celsius: "°C", fahrenheit: "°F" },
    humidity: "75%",
  },
  {
    city: "New York",
    temperature: 19,
    unit: { celsius: "°C", fahrenheit: "°F" },
    humidity: "65%",
  },
  {
    city: "Sydney",
    temperature: 18,
    unit: { celsius: "°C", fahrenheit: "°F" },
    humidity: "70%",
  },
  {
    city: "Los Angeles",
    temperature: 25,
    unit: { celsius: "°C", fahrenheit: "°F" },
    humidity: "80%",
  },
  {
    city: "Cape Town",
    temperature: 15,
    unit: { celsius: "°C", fahrenheit: "°F" },
    humidity: "70%",
  },
  {
    city: "Delhi",
    temperature: 15,
    unit: { celsius: "°C", fahrenheit: "°F" },
    humidity: "90%",
  },
];

function newCityFunction(event) {
  event.preventDefault();
  let newCity = searchBar.value;
  let lowerCity = newCity.toLowerCase();
  let cityElement = document.querySelector(".city");
  let message =
    "Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+" +
    newCity;
  let updatedCity = cityElement.innerHTML;
  for (let i = 0; i < cities.length; i++) {
    if (lowerCity === cities[i].city.toLowerCase()) {
      let tempF = cities[i].temperature * 1.8 + 32;
      tempF = Math.round(tempF);
      message = `It is currently ${cities[i].temperature}${cities[i].unit.celsius} (${tempF}${cities[i].unit.fahrenheit}) with a humidity of ${cities[i].humidity} in ${cities[i].city}.`;
      updatedCity = cities[i].city;
      console.log(updatedCity);
    }
  }
  cityElement.innerHTML = updatedCity;
  alert(message);
}
*/

//Search bar

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
  console.log(response);

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
}

function newCityFunction(event) {
  event.preventDefault();
  let apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
  let url = "https://api.openweathermap.org/data/2.5/weather?q=";
  let newCity = searchBar.value;
  let apiUrl = url + newCity + "&units=metric&appid=" + apiKey;
  axios.get(apiUrl).then(showUser);

  //let cityElement = document.querySelector(".city");
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

let now = new Date();
let day = now.getDay();
let hour = now.getHours();
let minute = now.getMinutes();
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
