var currentWeather = document.getElementById("currentWeather");
var fetchButton = document.getElementById("fetch-button");
var getCityEl = document.getElementById("getCity");
var recentSearch = document.getElementById("recentSearch");
var APIkey = "f805021a6cac71ae596d346f5ed12f7b";
var city;
var dateToday = moment().format('ll');
console.log(dateToday);

var fromCityName = function (event) {
    event.preventDefault();

    var getCity = getCityEl.value.trim();
    
    

    if(getCity) {
        getApi(getCity);
        getCityEl.value = "";
       } else {
        alert("please enter a city name");
        }
    };


function getApi(city) {

    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=ecc0be5fd92206da3aa90cc41c13ca56";
      
      
     fetch(requestUrl)
         .then(function (response1){
             return response1.json();
         })
         .then(function (data1){
             console.log(data1)
             
    // current weather conditions
    
    var lat = data1.coord.lat;
    var lon = data1.coord.lon;

    var locationUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=metric&current.uvi&appid=" + APIkey;

        fetch(locationUrl)
        .then(function (response2){
            return response2.json();
        })
        .then(function (data2){
            console.log(data2);

            
            var currentDate =document.createElement("h3")
            var temperature = document.createElement("p"); 
            var humidity = document.createElement("p");  
            var windSpeed = document.createElement("p"); 
            var uvIndex =  document.createElement("p"); 
        
            currentDate.textContent = dateToday;
            temperature.textContent = ("Temperature: " + (data2.current.temp) + "°C");         
            humidity.textContent = ("Humidity: "+ (data2.current.humidity) + "%");
            windSpeed.textContent =("WindSpeed: " + (data2.current.wind_speed) + "KMP");
            uvIndex.textContent = ("UV Index: " + (data2.current.uvi));
        

            currentWeather.appendChild(currentDate);
            currentWeather.appendChild(temperature);
            currentWeather.appendChild(humidity);
            currentWeather.appendChild(windSpeed);
            currentWeather.appendChild(uvIndex);
            //console.log(currentWeather);
        });
        
        
        });

        

    // storing the city name in local storage
    var citiesSearched = JSON.parse(localStorage.getItem("cityName","getCityEl.value.trim()"));
    localStorage.setItem("cityName", JSON.stringify(getCityEl.value.trim()));
    
    // reading city name and rendering into web browser
    recentSearch.prepend(citiesSearched);

    
    

    //var CityName = data.main.name;
    

    
   
        
      
      
        
    


 }




fetchButton.addEventListener("click", fromCityName);
