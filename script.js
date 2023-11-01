let displayCityName = document.getElementById("display-city");
let currentDay = dayjs().format("MM/DD/YY");
let currentTemp = document.getElementById("currentTemp")
let currentWind = document.getElementById("currentWind");
let currentHumidity = document.getElementById("currentHumidity");
let apple = "162c946f49abf4"
let pear = (3 * 3)
let orange = "f1000ea571f235be1"
const lat = 40.73; // new york
const lon = 73.93; 
const apiKey = apple + pear + orange;

fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
  .then(response => response.json())
  .then(data => {
    let weatherData = data;
    let weatherTemp = data.main.temp;
    let weatherHumidity = data.main.humidity
    let weatherWind = data.wind;

    currentTemp.innerHTML = "Temp: " + weatherTemp + "℉";
    currentWind.innerHTML = "Wind: " + weatherWind;
    currentHumidity.innerHTML = "Humidity: " + weatherHumidity

    console.log(data)
    console.log(data.main.temp);
    console.log(data.main.humidity);
    console.log(data.wind);
  })
  .catch(error => {
    console.error(error);
});

function getCity() {
    let input = document.getElementById("citysearch")
    let citySearch = input.value
    displayCityName.innerHTML = citySearch + " " + currentDay
}