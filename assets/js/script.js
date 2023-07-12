var apiKey = "1f6f694ad415ec6809cb1502b2268a83";
var weatherApi = "http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=" + apiKey;
// var geocodeApi = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=" + apiKey;
var city = "";
var state = "";
var country = "usa";

var searchButtonEl = document.getElementById('search');
var cityEl = document.getElementById('city-input');
var stateEl = document.getElementById('state-input');
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

//create a function on page load to pull values from locat storage and create a button element in html for a saved history search

searchButtonEl.addEventListener("click", function() {
    var city = $("#city-input").val();
    var state = $("#state-input").val();
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
                    index++;
                }
                console.log(data.list)
                //will need to store the city/state value  in local storage as an array and then use that to populate the list of search history secondary buttons

            })

        })
        
        
        
  
    console.log(city);
    console.log(state);
});

$(".btn-secondary").on("click", function(event) {
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
                index++;
            }
            console.log(data.list)
        })
    })
    
    
    

console.log(city);
console.log(state);
});

