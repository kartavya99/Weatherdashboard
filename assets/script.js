var currentWeather = document.getElementById("currentWeather");
var fetchButton = document.getElementById("fetch-button");
var getCityEl = document.getElementById("getCity");
var recentSearch = document.getElementById("recentSearch");
var APIkey = "f805021a6cac71ae596d346f5ed12f7b";
var city;

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
        });
        for (var i = 0; i < data1.current.length; i++){
            var temperature = document.createElement("h3"); 
            // var humidity = document.createElement("h4");  
            // var windSpeed = document.createElement("h5"); 
            // var uvIndex =  document.createElement("h6"); 
        
            temperature.textContent = data.current[i].temp;
            // humidity.textContent = data.current[i].humidity;
            // windSpeed.textContent = data.current[i].weather.wind_speed;
            // uvIndex.textContent = data.current[i].uvi;
        
            temperature.appendChild(currentWeather);
            }
        
        });

        

    // storing the city name in local storage
    var citiesSearched = JSON.parse(localStorage.getItem("cityName","getCityEl.value.trim()"));
    localStorage.setItem("cityName", JSON.stringify(getCityEl.value.trim()));
    
    // reading city name and rendering into web browser
    recentSearch.prepend(citiesSearched);

    
    

    //var CityName = data.main.name;
    

    
   
        
      
      
        
    


 }




fetchButton.addEventListener("click", fromCityName);
