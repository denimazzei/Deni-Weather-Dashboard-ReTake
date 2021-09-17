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
        
    }