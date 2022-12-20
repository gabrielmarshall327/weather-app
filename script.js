require('dotenv').config();


let weather = {
    apiKey : process.env.apiKey, //api key
    fetchWeather: function (city) { //fetches the weather from api
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" //the api url with inputs of name and api key
            + city 
            + "&units=imperial&appid=" 
            + this.apiKey
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
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    search : function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click" , function() {
        weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if(event.key == "Enter"){
        weather.search();
    }
});

weather.fetchWeather("Denver");