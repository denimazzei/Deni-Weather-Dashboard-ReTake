//search for a city

//presented with current & future weather conditions

//city is added to search history

//current weather conditions contain city name, date, icon representation of weather: temp, humidity, wind speed, UV index

//UV index presents with color indicating favorable, moderate, severe

//Future weather presented below (5-day forcast)

//Displays date and icon represenations of weather

//city in search history presents current & future conditions

//able to clear search from local storage


//First, declare variables needed for functions:

var search = document.getElementById('.city-form');
var citySearchInput = document.getElementById(".city-form input");
var display = document.getElementById (".search-list");
var cityHistory = document.getElementById (".history");
var cityList;

//Then declare open weather API key search parameters

var APIKey = "2c7d322923b0c930f658c4c4684eebcf";
var city;
var units = "&units=imperial";
var mainTemp = "°F";

document.onload = history();


//create query to call on API

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

//then fetch 

fetch(queryURL)

//user searches city name on form and presses search button
search.addEventListener("search", async function(event){
    event.preventDefault();
    display.innerHTML = "";

    //user's city search value is recorded and put in titlecase for consistency

    city = titlecase(citySearchInput.value);

    //declare and store the search history on local storage 

    var cityStorage = JSON.parse(localStorage.getItem(city));

    //if citystorage already exists for user, but new city name is not on list, add city to list

    if (cityStorage !==null && cityStorage.indexOf(city) === -1){
        cityList = cityStorage.concat(city);
    } else if (cityStorage == null) {
        cityList = [city];
    }
    history();

    //set value for local storage
    localStorage.setItem("cities", JSON.stringify(cityList));

    var cityLocation = await getCityLocation(city);
    var cityLatitude = cityLocation[0];
    var cityLongitude = cityLocation[1];

    var cityWeather = await getCityWeather(cityLongitude, cityLatitude);

    forecastDisp(cityWeather);
});

//get history

function history() {
    cityHistory.innerHTML = "";
    if (cityList !== undefined) {
        for (i=0; i <cityList.length; i++){
            var historyButton = document.createElement("button");
            historyButton.setAttribute("value", cityList[i]);
            historyButton.innerHTML = cityList[i];
            cityHistory.appendChild(historyButton);
        }
    }
};

//forecast function

function forecastDisp (data) {

    //determine day and time of search request

    var day = new Date(data.daily[0].dt * 1000).toLocaleDateString("en", {
        weekday: "long",
});

    for (i = 0; i < 5; i++) {
        var week = documnet.createElement("ul");
        week.classList.add("weekly-data", "forecast-window");

        var day = new Date(data.daily[i].dt * 1000).toLocaleDateString("en", {
            weekday: "long",
    });

    //create icons for temp, humidity, wind speed and UV index

    var weekIcon = document.createElement("li");
    var descIcon = document.createElement("li");
    var tempIcon = document.createElement("li");
    var dateIcon = document.createElement("li");
    var humiidityIcon = document.createElement("li");
    var windSpeedIcon = document.createElement("li");
    var UVIcon = document.createElement("li");

    weekIcon.innerHTML = "<https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png></img>";
    descIcon.innerHTML = "<span id='description'>" + data.daily[i].weather[0].description + "</span>";
    tempIcon.innerHTML = "<span id='temp'>" + Math.trunc(data.daily[i].temp.max) + "<sup>" + unitsIcon + "</sup> -" + Math.trunc(data.daily[0].temp.min) + "<sup>" + unitsIcon + "</sup></span>"; //temperature
    dateIcon.innerHTML = "<span id='day'>" + day + "</span>"; //date 
    humiidityIcon.innerHTML = "Humidity: " + data.daily[i].humidity + "%";
    windSpeedIcon.innerHTML = "Wind: " + data.daily[i].wind_speed + " mph"
    UVIcon.innerHTML = "UV Index: <span id=uvi>" + data.daily[i].uvi + "</span>"
    
        weeklyData.appendChild(weekIcon);
        weeklyData.appendChild(dateIcon);
        weeklyData.appendChild(descIcon);
        weeklyData.appendChild(tempIcon);
        weeklyData.appendChild(humiidityIcon);
        weeklyData.appendChild(windSpeedIcon);
        weeklyData.appendChild(UVIcon);

//UV Index color indicators
//Low 1-2
if (data.daily[i].uvi < 3) {
    var indexLow = document.createElement("li");
    indexLow.classList.add("low");
    indexLow.innerHTML = "Low";
    weeklyData.appendChild(indexLow);
//Moderate 3-5
    } else if (data.daily[i].uvi >= 3 && data.daily[i].uvi < 6) {
    var indexModerate = document.createElement("li");
    indexModerate.classList.add("moderate");
    indexModerate.innerHTML = "Moderate";
    weeklyData.appendChild(indexModerate);
//High 6-7
    } else if (data.daily[i].uvi >= 6 && data.daily[i].uvi < 8) {
    var indexHigh = document.createElement("li");
    indexHigh.classList.add("high");
    indexHigh.innerHTML = "High";
    weeklyData.appendChild(indexHigh);

}

function weatherForcast( cityID ) {
    var APIkey = '2c7d322923b0c930f658c4c4684eebcf';
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + APIkey)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      drawWeather(data); // Call drawWeather
    })
    .catch(function() {
      // catch any errors
    });
  }
  
  window.onload = function() {
    weatherForcast( 6167865 ); //update this after search query, lat lon
  }
  
  function drawWeather( d ) {
      var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
      var description = d.weather[0].description;
      
      document.getElementById('description').innerHTML = description;
      document.getElementById('temp').innerHTML = fahrenheit + '&deg;';
      document.getElementById('location').innerHTML = d.name;
      document.getElementById('UVIndex').innerHTML = current.uvi;
      document.getElementById('humidity').innerHTML = current.humidity;
      
      if( description.indexOf('rain') > 0 ) {
        document.body.className = 'rainy';
    } else if( description.indexOf('cloud') > 0 ) {
        document.body.className = 'cloudy';
    } else if( description.indexOf('sunny') > 0 ) {
        document.body.className = 'sunny';
    }
  }
