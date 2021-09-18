
var search = document.querySelector(".search-form");
var cityID = document.querySelector(".search-form input");
var display = document.querySelector(".search-list");
var cityList;
var cityHistory = document.querySelector(".history");




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

// one call API data
async function getCityWeather(lat, lon) {
    var oneCallURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&appid=" + APIkey + units;

    const response = await fetch(oneCallURL);
    const data = await response.json();
    console.log(data);
    return data;
}

// retrieve lat/lon
async function getCityLocation(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;

    var response = await fetch(queryURL);
    var data = await response.json();  

    var cityLoc = [data.coord.lat, data.coord.lon];
    return cityLoc
}
