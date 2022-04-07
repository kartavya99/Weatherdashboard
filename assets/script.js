var currentWeather = document.getElementById("currentCityWeather");
var fetchButton = document.getElementById("fetch-button");
var getCityEl = document.getElementById("getCity");
var searchHistory = document.getElementById("searchHistory");
var APIkey = "f805021a6cac71ae596d346f5ed12f7b";
var today = moment().format('ll');
console.log(today);
var fiveDay = document.getElementById("fiveDay");
var weatherHeading = document.getElementById("futureHeading");
//var weatherDisplay = document.getElementById("weatherDisplay");
//document.getElementById("weatherDisplay").innerHTML ="";




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

                currentWeather.textContent = "";
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
            

                currentWeather.append(currentDate, temperature, windSpeed, humidity, uvIndex);
                var futureHeading = document.createElement("h3");
                futureHeading.textContent = "5-Day Forecast";
                weatherHeading.textContent = "";
                weatherHeading.append(futureHeading);
                console.log(currentWeather);

                fiveDay.textContent = "";
                //for loop to access the weather data for next 5 days.
                for (var i = 1; i < 6; i++){
                    var cityInfo = {
                        date: data2.daily[i].dt,
                        icon: data2.daily[i].weather[0].icon,
                        temp: data2.daily[i].temp.day,
                        humidity: data2.daily[i].humidity
                    };
                    var futureDate = moment.unix(cityInfo.date).format("ll");
                    var iconURL = `<img src="https://openweathermap.org/img/w/${cityInfo.icon}.png" alt="${data2.daily[i].weather[0].main}" />`;

                    
                    var futureCard = document.createElement("div");
                    var fiveDatDate= document.createElement("h5");
                    var fiveDayTemp = document.createElement("p");
                    var fiveDayIcon = document.createElement("p");
                    var fiveDayHumidity = document.createElement("p");
                    
                    
                    
                    fiveDatDate.append("Date :"+ " " + futureDate);
                    fiveDayTemp.append("Temperature :" + " " + cityInfo.temp );
                    fiveDayIcon.append(iconURL);
                    fiveDayHumidity.append("Humidity :" + " " + cityInfo.humidity + "%");

                    // console.log(fiveDatDate, fiveDayTemp, fiveDayHumidity);
                    console.log(fiveDayIcon);
                    
                    futureCard.append(fiveDatDate, fiveDayTemp, fiveDayHumidity);

                     //futureCard.append("Date"+ " " + futureDate , "Temperature:" + " " + cityInfo.temp , "Humidity" + " " + cityInfo.humidity);
                    fiveDay.appendChild(futureCard);
                    // console.log(futureDate);
                    // console.log(cityInfo);      
               

                futureCard.setAttribute("class", "pl-3, card-body");
                //futureCard.setAttribute("class" , "pl-3 pt-3 mb-3 bg-primary text-light", "card-body", "width: 12rem");
                futureCard.setAttribute("style", "width: 12rem");
                               



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
    searchHistory.setAttribute("class", "btn btn-primary");
    searchHistory.addEventListener("click", (getCity));
    localStorage.removeItem("city-search");
    
    
     
    
 

 }



fetchButton.addEventListener("click", fromCityName);
