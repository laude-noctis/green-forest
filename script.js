let displayCityName = document.getElementById("display-city");
let currentDate = dayjs().format("MM/DD/YYYY");
let currentTemp = document.getElementById("currentTemp")
let currentWind = document.getElementById("currentWind");
let currentHumidity = document.getElementById("currentHumidity");
let apple = "162c946f49abf4"
let pear = (3 * 3)
let orange = "f1000ea571f235be1"

function getCity() {
    let input = document.getElementById("citysearch")
    let citySearch = input.value
    displayCityName.innerHTML = citySearch + " " + currentDate
}

let cityname = "New York" // test holder for now
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apple + pear + orange}&units=imperial`)
  .then(response => response.json())
  .then(data => {
    // let weatherData = data;
    let weatherTemp = data.main.temp;
    let weatherHumidity = data.main.humidity
    let weatherWind = data.wind.speed;

    currentTemp.innerHTML = "Temp: " + weatherTemp + "℉";
    currentWind.innerHTML = "Wind: " + weatherWind + " MPH";
    currentHumidity.innerHTML = "Humidity: " + weatherHumidity + "%"

    console.log(data)
    console.log(data.main.temp);
    console.log(data.main.humidity);
    console.log(data.wind);

  })
  .catch(error => {
    console.error(error);
});

// fetch("https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${apple + pear + orange}&units=imperial")

let forecastDate = dayjs().add(1, "day");
console.log(forecastDate.format("MM/DD/YY"))