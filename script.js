let displayCityName = document.getElementById("display-city");
let currentDate = dayjs().format("MM/DD/YYYY");
let searchBtn = document.getElementById("searchbtn")
let forecastEL = document.querySelector(".display-future-forecast")
let apple = "162c946f49abf4"
let pear = (3 * 3)
let orange = "f1000ea571f235be1"
let api = apple + pear + orange

let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
let cityArray = []

function displayLocalStorage() {
    let history = JSON.parse(localStorage.getItem("searchHistory"))
    let displayEl = document.getElementById("history-search")

    if (history) {
        for (let i = 0; i < history.length; ++i) {
            let buttonEl = document.createElement("button");
            let value = history[i];
            buttonEl.classList.add("historyBtn");
            buttonEl.textContent = value;
            displayEl.appendChild(buttonEl);
        }
    }
}

function getCity(citySearch) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${api}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            getforecast(data.name);
        })
        .catch(error => {
            console.error(error);
        });
}

function gatherCityName(citySearch) {
    if (!cityArray.includes(citySearch)) {
        cityArray.push(citySearch);
        history.push(citySearch);
        cityArrayLoop();
        localStorage.setItem("searchHistory", JSON.stringify(history));
    }
}

searchBtn.addEventListener("click", () => {
    let input = document.getElementById("citysearch");
    let citySearch = input.value;
    gatherCityName(citySearch);
    getCity(citySearch);
})

function cityArrayLoop() {
    for (let i = 0; i < cityArray.length; ++i) {
        let cities = cityArray[i];
        createBtnHistory(cities);
    }
}

function createBtnHistory(citySearch) {
    let searchHistory = document.getElementById("history-search");

    let existingButton = Array.from(searchHistory.children).find(button => button.textContent === citySearch);

    if (existingButton) {
        return;
    }

    let btnSearchHistory = document.createElement("button");
    btnSearchHistory.classList.add("historyBtn");
    btnSearchHistory.textContent = citySearch;
    searchHistory.appendChild(btnSearchHistory);
}

function getforecast(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${api}&units=imperial`)
        .then(response => response.json())
        .then((data) => {
            // console.log(data);
            displayForecast(data.list);
        })

}

function displayWeather(data) {
    let currentTemp = document.getElementById("currentTemp");
    let currentWind = document.getElementById("currentWind");
    let currentHumidity = document.getElementById("currentHumidity");
    let currentIcon = document.createElement("img");
    currentIcon.setAttribute("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

    displayCityName.innerHTML = "";

    let cityNameElement = document.createElement("span");
    cityNameElement.textContent = data.name;

    let currentDateElement = document.createElement("span");
    currentDateElement.textContent = currentDate;

    displayCityName.appendChild(cityNameElement);
    displayCityName.appendChild(document.createTextNode(" "));
    displayCityName.appendChild(currentDateElement);
    displayCityName.appendChild(document.createTextNode(" "));
    displayCityName.appendChild(currentIcon);

    let weatherTemp = data.main.temp;
    let weatherHumidity = data.main.humidity;
    let weatherWind = data.wind.speed;

    currentTemp.innerHTML = "Temp: " + weatherTemp + "℉";
    currentWind.innerHTML = "Wind: " + weatherWind + " MPH";
    currentHumidity.innerHTML = "Humidity: " + weatherHumidity + "%";

    // console.log(data);
    // console.log(data.main.temp);
    // console.log(data.main.humidity);
    // console.log(data.wind);

}

function displayForecast(data) {
    forecastEL.innerHTML = "";

    for (let i = 0; i < 5; ++i) {
        const index = i * 8 + 5;

        const div = document.createElement("div");
        div.setAttribute("class", "future-forecast");

        const h4 = document.createElement("h4");
        const day = new Date(data[index].dt * 1000).toDateString();
        h4.textContent = day;

        const span = document.createElement("span");
        const icon = document.createElement("img");
        icon.setAttribute("src", "https://openweathermap.org/img/w/" + data[index].weather[0].icon + ".png");

        const temp = document.createElement("p");
        temp.setAttribute("class", "twh");

        const wind = document.createElement("p");
        wind.setAttribute("class", "twh");

        const humidity = document.createElement("p");
        humidity.setAttribute("class", "twh");

        temp.textContent = `Temp: ${data[index].main.temp} F`;
        humidity.textContent = `Humidity: ${data[index].main.humidity} %`;
        wind.textContent = `Wind Speed: ${data[index].wind.speed} MPH`;

        span.append(icon);
        h4.append(span);
        div.append(h4, temp, wind, humidity);

        forecastEL.append(div);
    }
}

let buttonForecast = document.getElementById("history-search");
buttonForecast.addEventListener("click", historyForecast);

function historyForecast(event) {
    const cityButton = event.target;
    const buttonText = cityButton.textContent;
    //   console.log(buttonText);
    getCity(buttonText);
}

displayLocalStorage();