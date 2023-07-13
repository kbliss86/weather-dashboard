var apiKey = "1f6f694ad415ec6809cb1502b2268a83";
var weatherApi = "http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=" + apiKey;
// var geocodeApi = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=" + apiKey;
var city = "";
var state = "";
var country = "usa";

var searchButtonEl = document.getElementById('search');
var cityEl = document.getElementById('city-input');
var stateEl = document.getElementById('state-input');
var searchCardEl = document.getElementById('search-card');
var cityNameEL = document.getElementById('city-name');

$(function () {
    var stateNames = [
        'AL',
        'AK',
        'AZ',
        'AR',
        'CA',
        'CO',
        'CT',
        'DE',
        'FL',
        'GA',
        'HI',
        'ID',
        'IL',
        'IN',
        'IA',
        'KS',
        'KY',
        'LA',
        'ME',
        'MD',
        'MA',
        'MI',
        'MN',
        'MS',
        'MO',
        'MT',
        'NE',
        'NV',
        'NH',
        'NJ',
        'NM',
        'NY',
        'NC',
        'ND',
        'OH',
        'OK',
        'OR',
        'PA',
        'RI',
        'SC',
        'SD',
        'TN',
        "TX",
        'UT',
        'VT',
        'VA',
        'WA',
        'WV',
        'WI',
        'WY'
    ];
    $("#state-input").autocomplete({
      source: stateNames,
    });
  });

  window.addEventListener("load", function(event) {
    var searchHistory = JSON.parse(localStorage.getItem("history"));
    console.log(searchHistory);
    buttonCreate = "button";
    var si = 0;
    for (let si = 0; si < searchHistory.length; si++) {
       var buttonEl = document.createElement(buttonCreate);
       buttonEl.textContent = searchHistory[si],
       buttonEl.setAttribute("class", "btn btn-secondary w-100 m-2 p-3 s-3");
       buttonEl.setAttribute("type", "button");
       searchCardEl.appendChild(buttonEl);
        
    }

});

searchButtonEl.addEventListener("click", function() {
    var city = $("#city-input").val();
    var state = $("#state-input").val();
        city = city.toLowerCase().replace(/(^|\s)\S/g, function(letter) {
            return letter.toUpperCase();
        });
        state = state.toUpperCase();
    var history = [];
        if (JSON.parse(localStorage.getItem("history")) !== null) {
            history = JSON.parse(localStorage.getItem("history"));
        };
        history.push(city+","+state);
        localStorage.setItem("history", JSON.stringify(history));

    var geoCodeAPI = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + ",usa&limit=1&appid=" + apiKey;
        fetch(geoCodeAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            const {lat, lon} = data[0];
            console.log(lat);
            console.log(lon);
            var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
            fetch(weatherApi)
            .then(function (response) {
                return response.json();
            })
            .then (function (data) {
                console.log(data);
                var list = data.list;
                var index = 0;
                for (var i = 0; i < list.length; i += 7) {

                    var listItem = list[i]
                    console.log(i);
                    var main = listItem.main;
                    var wind = listItem.wind;
                    var weather = listItem.weather;
                    var elementId = "#tomorrow" + index;
                    console.log(elementId);
                    var dateText =  dayjs(listItem.dt_txt).format('MM/DD/YYYY');
                        $(elementId + " li:first-child").text("Date: "+dateText);
                    console.log(dateText);
                    var tempText = main.temp;
                        $(elementId + " li:nth-child(2)").text("Temp: "+tempText);
                    console.log(tempText);
                    var windText = wind.speed;
                        $(elementId + " li:nth-child(3)").text("Wind: "+windText);
                    console.log(windText);
                    var humText = main.humidity;
                        $(elementId + " li:nth-child(4)").text("Humidity: "+humText);
                    console.log(humText);
                    var icon = weather[0].icon;
                    console.log(icon);
                        $(elementId + " img").attr("src", "https://openweathermap.org/img/wn/"+icon+".png");
                    index++;
                }
                console.log(data.list)
                cityNameEL.textContent = city+","+state;

            })

        })
        
        
        
  
    console.log(city);
    console.log(state);
});

// $(".btn-secondary").on("click", function(event) {
$(document).on("click", ".btn-secondary", function(event) {
    event.preventDefault();
    var city = $(this).text();
    console.log(city);
    var geoCodeAPI = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + ",usa&limit=1&appid=" + apiKey;
    fetch(geoCodeAPI)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        const {lat, lon} = data[0];
        console.log(lat);
        console.log(lon);
        var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
        fetch(weatherApi)
        .then(function (response) {
            return response.json();
        })
        .then (function (data) {
            console.log(data);
            var list = data.list;
            var index = 0;
            for (var i = 0; i < list.length; i += 7) {

                var listItem = list[i]
                console.log(i);
                var main = listItem.main;
                var wind = listItem.wind;
                var weather = listItem.weather;
                var elementId = "#tomorrow" + index;
                console.log(elementId);
                var dateText =  dayjs(listItem.dt_txt).format('MM/DD/YYYY');
                    $(elementId + " li:first-child").text("Date: "+dateText);
                console.log(dateText);
                var tempText = main.temp;
                    $(elementId + " li:nth-child(2)").text("Temp: "+tempText);
                console.log(tempText);
                var windText = wind.speed;
                    $(elementId + " li:nth-child(3)").text("Wind: "+windText);
                console.log(windText);
                var humText = main.humidity;
                    $(elementId + " li:nth-child(4)").text("Humidity: "+humText);
                console.log(humText);
                var icon = weather[0].icon;
                console.log(icon);
                    $(elementId + " img").attr("src", "https://openweathermap.org/img/wn/"+icon+".png");
                index++;
            }
            console.log(data.list)
            cityNameEL.textContent = city;
        })
    })
    
    
    

console.log(city);
console.log(state);
});
