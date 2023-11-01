let apple = "162c946f49abf4"
let pear = (3 * 3)
let orange = "f1000ea571f235be1"

const lat = 40.73;
const lon = 73.93; 
const apiKey = "162c946f49abf49f1000ea571f235be1"; // Replace with your actual API key

fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    console.log(data.main.temp);
    console.log(data.main.humidity);
    console.log(data.wind);
  })
  .catch(error => {
    console.error(error);
});
