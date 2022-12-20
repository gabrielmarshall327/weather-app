import apiKeysArr from "./apiKeys.js";

let weather = {
    fetchWeather: function (city) { //fetches the weather from api
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" //the api url with inputs of name and api key
            + city 
            + "&units=imperial&appid=" 
            + apiKeysArr[0]
        )
        .then((response) => response.json()) //pulls data from json?
        .then((data) => this.displayWeather(data)); //data is displayed by function
    },
    displayWeather: function (data) { //function used to display elements of weather
        const { name } = data; //pulls name from json (not in a object)
        const { icon, description } = data.weather[0]; //pulls elements from weather arr object
        const { temp, humidity } = data.main; //pulls data from main object
        const { speed } = data.wind; //pulls from wind object
        //console.log(name, icon, description,temp,humidity,speed); //console.log is print to console and is printing all the elements
        document.querySelector(".city").innerText = "Weather in " + name; //display info on page
        document.querySelector(".icon").src = 
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " mph";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?mountains)" //can replace mountains with anything to change picture
    },
    search : function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

let geocode = {
    reverseGeocode: function (latitude,longitude){
        var api_key = apiKeysArr[1];
      
        var api_url = 'https://api.opencagedata.com/geocode/v1/json'
      
        var request_url = api_url
          + '?'
          + 'key=' + api_key
          + '&q=' + encodeURIComponent(latitude + ',' + longitude)
          + '&pretty=1'
          + '&no_annotations=1';
      
        var request = new XMLHttpRequest();
        request.open('GET', request_url, true);
      
        request.onload = function() {
          if (request.status === 200){
            // Success!
            var data = JSON.parse(request.responseText);
            weather.fetchWeather(data.results[0].components.city);
      
          } else if (request.status <= 500){
            // We reached our target server, but it returned an error
      
            console.log("unable to geocode! Response code: " + request.status);
            var data = JSON.parse(request.responseText);
            console.log('error msg: ' + data.status.message);
          } else {
            console.log("server error");
          }
        };
      
        request.onerror = function() {
          // There was a connection error of some sort
          console.log("unable to connect to server");
        };
      
        request.send();  // make the request
    },
    getLocation: function () {
        function success (data) {
            geocode.reverseGeocode(data.coords.latitude, data.coords.longitude);
        }
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(success,console.error);
        }
        else {
            weather.fetchWeather("Denver");
        }
    }
};

document.querySelector(".search button").addEventListener("click" , function() {
        weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if(event.key == "Enter"){
        weather.search();
    }
});

geocode.getLocation();