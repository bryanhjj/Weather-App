const apiKey = "e8957761dd3908d129221b5a9d89eae3"; // should put this in env but since it's just a free weather query api should be fine
const form = document.querySelector('#form');
const userLocation = document.querySelector('#locationForm');
const searchButton = document.querySelector('#search');
const resetButton = document.querySelector('#reset');
const weatherDescrip = document.querySelector('#weatherDescription');
const temperature = document.querySelector('#temperature');
const humidity = document.querySelector('#humidity');
const cityName = document.querySelector('#cityName');
const results = document.querySelector('#results');
const span = document.querySelector('.close');


// updates the relevant DOM elements with the extracted data
const dataDisplay = (obj) => {
  weatherDescrip.textContent = obj.description;
  temperature.textContent = Math.round(obj.cTemp) + "°C / " + Math.round(obj.fTemp) + "°F";
  humidity.textContent = obj.humidity + "%";
};

// extracts the data that I want from the returned json object and stores them for later use
const dataExtract = (rawData) => {
  const dataStorage = {
    description : rawData.weather[0].main,
    cTemp : rawData.main.temp - 273.15,
    fTemp : (rawData.main.temp - 273.15) * 9 / 5 + 32,
    humidity : rawData.main.humidity
  };
  return dataStorage;
};

// obtains the weather data according to user input, process said data (dataExtract()) and displays it (dataDisplay())
const getWeatherData = async () => {
     let userLocData = userLocation.value;
     cityName.textContent = userLocData;
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userLocData}&appid=${apiKey}`, 
      {
        mode: 'cors'
      });
      const weatherData = await res.json();
      const sanitisedData = dataExtract(weatherData);
      dataDisplay(sanitisedData);
    } catch(err) {
      alert(err);
    };
};

searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  getWeatherData();
  form.reset();
  results.style.display = "block"; // opens the modal box after clicking the search button
  span.style.display = "block"; // shows the "x" button for closing the modal box
});


// modal box DOM manipulation
span.addEventListener('click', () => {
  results.style.display = "none"; // closes the modal box when users press the "x" button
});

window.addEventListener('click', (event) => {
  if (event.target == results) {
    results.style.display = "none"; // closes the modal box when users click outside of the modal box
  }
})
