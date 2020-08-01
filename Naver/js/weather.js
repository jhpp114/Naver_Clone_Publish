const API_KEY = `f1531bea64c81285bbf775f7d0ad13bd`;
// DOM elements
const weather_data = document.querySelector('.weather_data');
const weather_icon = document.querySelector('.weather_title');
console.log(weather_data);
// ========function call========
generate_weather_data();

// ========= functions ==========
function city_setup() {
    const CITY_ARRAY = [
        'Seoul'
    ,   'Seattle'
    ,   'Goyang'
    ,   'London'
    ,   'Tokyo'
    ,   'Osaka'
    ,   'Busan'
    ,   'New York'
    ];
    return CITY_ARRAY;
}

function generate_weather_data() {
    let cities = city_setup();
    let API_LINK = ``;
    let index = 0;
    setInterval(()=> {
        API_LINK = `https://api.openweathermap.org/data/2.5/weather?q=${cities[index]}&appid=${API_KEY}`;
        fetch(API_LINK)
        .then(response => response.json())
        .then(data =>  {
            let city_name = data.name;
            let weather = data.weather[0].main;
            let description = data.weather[0].description;
            let icon = data.weather[0].icon;
            let icon_link = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            weather_icon.innerHTML = `<img src="${icon_link}" width="80px">`;
            //console.log(icon);
            weather_data.textContent = `City: ${city_name} - Weather: ${description}`;
        });
        if (index < cities.length - 1) {
            index++;
        } else {
            index = 0;
        }
    }, 3000);
}

console.log("hello from weather");