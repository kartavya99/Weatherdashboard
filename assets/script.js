var currentWeather = document.getElementById("currentWeather");
var fetchButton = document.getElementById("fetch-button");
var getCityEl = document.getElementById("getCity");
var searchHistory = document.getElementById("searchHistory");
var APIkey = "f805021a6cac71ae596d346f5ed12f7b";
var today = moment().format('ll');
console.log(today);
var fiveDay = document.getElementById("fiveDay");




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

                // current weather conditions.
                var currentDate =document.createElement("h3")
                var temperature = document.createElement("p"); 
                var humidity = document.createElement("p");  
                var windSpeed = document.createElement("p"); 
                var uvIndex =  document.createElement("p"); 
            
                currentDate.textContent = today;
                temperature.textContent = ("Temperature: " + (data2.current.temp) + "°C");         
                humidity.textContent = ("Humidity: "+ (data2.current.humidity) + "%");
                windSpeed.textContent =("WindSpeed: " + (data2.current.wind_speed) + "KMP");
                uvIndex.textContent = ("UV Index: " + (data2.current.uvi));
            

                currentWeather.appendChild(currentDate);
                currentWeather.appendChild(temperature);
                currentWeather.appendChild(humidity);
                currentWeather.appendChild(windSpeed);
                currentWeather.appendChild(uvIndex);
                

                //for loop to access the weather data for next 5 days.
                for (var i = 1; i < 6; i++){
                    var cityInfo = {
                        date: data2.daily[i].dt,
                        icon: data2.daily[i].weather[0].icon,
                        temp: data2.daily[i].temp.day,
                        humidity: data2.daily[i].humidity
                    };
                    
                   
                     // var futureDate = document.createElement("h4");
                    // var futureTemp = document.createElement("p");
                    // var futureHumidity = document.createElement("p");

                    // futureDate.textContent = data2.daily[i].dt;
                    // futureTemp.textContent = data2.daily[i].temp.day;
                    // futureHumidity.textContent = data2.daily[i].humidity;
                    
                    
                   var futureDate = moment.unix(cityInfo.date).format("ll");
                   console.log(futureDate);
                   console.log(cityInfo);
                    
                    //rendering data, temperature and humidity here
                    
                    
                    
                    console.log(fiveDay);
                  
                   
                    
                   
                   
                   

                }


                         
        });
       
        
        });


    // storing the city name in local storage
    var citiesSearched = JSON.parse(localStorage.getItem("city-search")) || [];
    citiesSearched.unshift(getCityEl.value.trim());
    localStorage.setItem("city-search", JSON.stringify(citiesSearched));
    console.log(citiesSearched);
    // reading city name and rendering into web browser

    var recentSearchList = document.createElement("ul");
    recentSearchList.textContent = citiesSearched;
    searchHistory.prepend(recentSearchList);
    searchHistory.setAttribute("class", "btn-info");
    searchHistory.addEventListener("click", (getCity));
    // create list element and set button attribute
    // add onclick event.

    
    
     
        
    
      

 }




fetchButton.addEventListener("click", fromCityName);
