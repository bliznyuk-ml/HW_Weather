let date = document.getElementById('date');
let d = new Date();
let city = document.getElementById('city');
let temp = document.getElementById('temp');
let min = document.getElementById('min');
let max = document.getElementById('max');
let pic = document.querySelector('img');
let wind = document.getElementById('wind');
let press = document.getElementById('press');
let humidity = document.getElementById('humidity');
let sunrise = document.getElementById('sunrise');
let sunset = document.getElementById('sunset');

let cities=[ {name:"Kyiv",lat: 50.45000 , lon: 30.52333 },
  {name:"Vinnitsa", lat: 49.23278 , lon: 28.46806},
  {name:'Dnipro', lat: 48.45000, lon: 34.98333},
  {name:'Donetsk', lat: 48.00278, lon: 37.80528},{name:'Mariupol', lat: 47.09750, lon:37.54361},
  {name:'Zhytomyr', lat: 50.25667, lon: 28.66417},
  {name:'Zaporizhzhia', lat: 47.84361, lon: 35.13056},
  {name:'Ivano-Frankivsk', lat: 48.92278, lon: 24.71028},
  {name:'Kropyvnytskyi', lat: 48.50917, lon: 32.25889},
  {name:'Luhansk', lat: 48.57444, lon: 39.30778},
  {name:'Lutsk', lat: 50.74722, lon: 25.32528},
  {name:'Lviv', lat: 49.83917, lon: 24.02972},
  {name:'Mykolaiv', lat: 46.97583, lon: 31.99472},
  {name:'Odesa', lat: 46.46667, lon: 30.73333},
  {name: 'Poltava', lat: 49.58944, lon: 34.55139},
  {name: 'Rivne', lat: 50.62111, lon: 26.25194},
  {name:'Sumy', lat: 50.90722, lon: 34.79861},
  {name: 'Ternopil', lat: 49.55306, lon: 25.59500},
  {name: 'Uzhhorod', lat: 48.62111, lon: 22.28778 },
  {name: 'Kharkiv', lat: 50.00444, lon: 36.23139},
  {name:'Kherson',  lat: 46.63611, lon: 32.61694},
  {name:'Khmelnytskyi', lat: 49.42194 , lon: 26.98972},
  {name:'Cherkasy', lat: 49.44444, lon: 32.05972},
  {name:'Chernihiv', lat: 51.50000, lon: 31.30000},
  {name:'Chernivtsi', lat: 48.29222, lon: 25.93500},
  {name:'Simferopol', lat: 44.94806, lon: 34.10417}];

let but = document.querySelector('button');
but.addEventListener('click', geo);

date.innerHTML = d.toDateString();

function geo() {
  navigator.geolocation.getCurrentPosition(success);
  function success(pos) {
    const crd = pos.coords;

    let lat = crd.latitude.toFixed(2);
    let lon = crd.longitude.toFixed(2);
    //navLat.innerHTML = lat;
    //navLon.innerHTML = lon;
    ask(lat, lon, 1);
  }
}

let select = document.getElementById('chooseCity');
select.addEventListener('change', selectCity);

function selectCity(){
  for (let i = 0; i < cities.length; i++){
    if(cities[i].name === select.value){
      ask(cities[i].lat, cities[i].lon, 2);
    }
  }
}

function ask(lat, lon, geo) {
  let request;
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
  }
  const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?APPID=7b5cbb6bb21d0fc862c3b47a3b967ddf&lat=${lat}&lon=${lon}&units=metric`;
//document.getElementById('url').innerHTML = weatherUrl;
  request.open("GET", weatherUrl);
  request.addEventListener("readystatechange", () => {
    console.log("readyState = " + request.readyState);
    if (request.readyState === 4 && request.status === 200) {
      const json = JSON.parse(request.response);
      console.log(json);
      if(geo === 1) {
        city.innerHTML = `Latitude: ${lat} Longitude: ${lon}`;
      } else {
        city.innerHTML = select.value;
      }
      temp.innerHTML = json.main.temp.toFixed(0) + ' &#8451;';
      min.innerHTML = 'min temp: ' + json.main.temp_min.toFixed(0) + ' &#8451;';
      max.innerHTML = 'max temp: ' + json.main.temp_max.toFixed(0) + ' &#8451;';
      pic.src = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
      wind.innerHTML = 'Wind: ' + json.wind.speed + 'm/s';
      press.innerHTML = 'Pressure: ' + json.main.pressure + 'mm';
      humidity.innerHTML = 'Humidity: ' + json.main.humidity + '%';
      //sunrise.innerHTML = 'Rain: ' + json.rain.1h + 'mm';
    }
  });
  request.send();
}
