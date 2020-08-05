const api = {
    key: "7060d35157730c74ca303f33ecbf7bcf",
    // baseurl: "https://api.openweathermap.org/data/2.5/"
    
}

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
       
    }
}


function getResults(query) {
    // fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    // fetch(api.baseurl)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${api.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
    // console.log(weather);
    let city = document.querySelector(".location .city");
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.current  .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)} <span>&deg;c</span>`;

    let weather_el = document.querySelector('.current  .weather');
    weather_el.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerHTML = `${Math.round(weather.main.temp_min)}&deg;c / ${Math.round(weather.main.temp_max)}&deg;c`;

}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", 
"November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday"];

let day = days[d.getDay()];
let date = d.getDate();
let month = months[d.getMonth()];
let year = d.getFullYear();

return `${day} ${date} ${month} ${year}`;

}