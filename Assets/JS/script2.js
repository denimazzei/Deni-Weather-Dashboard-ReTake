//declare variables using JQuery

var citySearch = $("#city-search");
var cityForm = $(".city-form");
var city = $(".input");
var cityInput;
var cityListItem;
var searchButton = $("#search");
var clearButton = $("#clear");
var history = $(".history");
var cityList = $(".city-list");
var dailyforcast = $(".daily-forcast");
var forcastCard = $(".forcast-body");
var weatherImage = $(".weather-image");
var cityName = $(".cityName");
var temp = $(".temperature");
var humidity = $(".humidity");
var windSpeed = $(".windSpeed");
var UVI = $(".UVIndex");
var dayOne = $(".day1");
var dayTwo = $(".day2");
var dayThree = $(".day3");
var dayFour = $(".day4");
var dayFive = $(".day5");

//API Key for Weather
var APIKey = "2c7d322923b0c930f658c4c4684eebcf";
var units = "&units=imperial";

//determine date at search to build current & future forecast
var date = moment().get("date");
var month = moment().get("month");
var addDateDiv = $(".date");
var timeDisplay = moment().format("dddd,MMM Do");
var dateDiv = addDateDiv.text(timeDisplay);


//get value of city search if new search
if (!JSON.parse(localStorage.getItem("city"))) {
    cityinput = "Enter city name";
  } else {
    cityinput = city.val(getLocal("city"));
  }


//save search variable to local storage
function localStorage(APIKey, search) {
    localStorage.setItem(key, JSON.stringify(search));
  }



// retrieve lat/lon of variable searched
async function getCityLocation(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    var response = await fetch(queryURL);
    var data = await response.json();  

    var cityLoc = [data.coord.lat, data.coord.lon];
    return cityLoc
}

// one call API function
async function getCityWeather(lat, lon) {
    var oneCallURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&appid=" + APIKey + units;

    const response = await fetch(oneCallURL);
    const data = await response.json();
    console.log(data);
    return data;
}

searchButton.on("click", search_and_save);
clearButton.on("click", clear);