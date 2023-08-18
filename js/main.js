
let myRow = document.querySelector(".myRow") ;
let findInPut = document.getElementById("findInPut") ;

let weatherList = [] ;
async function getWeather (country = "cairo") {
  let req = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${country}&days=7`);
  // let req = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=egypt&days=7`);
  weatherList = await req.json() ;
  displayData () ;
}

getWeather()

function displayData () {
  const d = new  Date(weatherList.location.localtime);
  const n = new  Date(weatherList.forecast.forecastday[1].date);
  const nn = new  Date(weatherList.forecast.forecastday[2].date);
  // console.log(d.toDateString());
  // d.toDateString();
  let mounth = d.toLocaleDateString("en" , {month:"long"});
  let weekDay = d.toLocaleDateString("en" , {weekday:"long"});
  let weekDayN = n.toLocaleDateString("en" , {weekday:"long"});
  let weekDayNN = nn.toLocaleDateString("en" , {weekday:"long"});


  // let d = new Data (weatherList.current.last_updated)
  // console.log(d);
  let cartona = `
  <div class="col-md-4 ">
  <div class="inner  rounded-start innerColorFL">
  <div class="d-flex justify-content-between align-items-center  p-3 rounded-start innerColorFLIn ">
    <p class="m-0">${weekDay}</p>
    <p class="m-0">${d.getDate()} ${mounth}</p>
  </div>
  <div class=" p-4">
  <h4>${weatherList["location"]["name"]}</h4>
    <div class="d-flex justify-content-around align-items-center flex-row">
      <p class="fa-4x fw-bold">${weatherList.current.temp_c}<sup>o</sup>C</p>
      <img class="w-25" src="http://${weatherList.current.condition.icon}" alt="">
    </div>
    <p class="text-info fw-light">${weatherList.current.condition.text}</p>
    <div class="d-flex gap-3 ">
      <p class="text-muted">${Math.round(weatherList.forecast.forecastday[0].day.maxwind_mph)}%</p>
      <p  class="text-muted">${Math.round(weatherList.forecast.forecastday[0].hour[0].wind_kph)} km/h</p>
      <p  class="text-muted">${weatherList.current.wind_dir} </p>
    </div>
  </div>
</div>
</div>
<div class="col-md-4 ">
  <div class="inner text-center innerColorIn ">
    <div class="d-flex justify-content-center align-items-center p-3 innerColorInIn">
    <p class="m-0">${weekDayN}</p>
    </div>
    <div  class=" d-flex justify-content-start align-items-center flex-column">
    <img class="w-25" src="http://${weatherList.forecast.forecastday[1].day.condition.icon}" alt="">
    <p class="fa-2x fw-bold">${weatherList.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</p>
    <p class="fa-1x ">${weatherList.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C</p>
    <p class="text-info fw-light">${weatherList.forecast.forecastday[1].day.condition.text}</p>
    </div>
</div>
</div>
<div class="col-md-4 ">
  <div class="inner text-center innerColorFL ">
    <div class="d-flex justify-content-center align-items-center p-3 innerColorFLIn">
    <p class="m-0">${weekDayNN}</p>
    </div>
    <div  class=" d-flex justify-content-center align-items-center flex-column">
    <img class="w-25" src="http://${weatherList.forecast.forecastday[2].day.condition.icon}" alt="">
    <p class="fa-2x fw-bold">${weatherList.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</p>
    <p class="fa-1x ">${weatherList.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C</p>
    <p class="text-info fw-light">${weatherList.forecast.forecastday[2].day.condition.text}</p>
    </div>
</div>
</div>
  ` ;
  myRow.innerHTML = cartona ;
  
}

findInPut.addEventListener("input", findCountry)
async function findCountry () {
  // let req = await fetch(`https://api.weatherapi.com/v1/search.json?key=7d77b96c972b4d119a3151101212704&q=${find}`);
  // let data = await req.json()
  let find = findInPut.value ;
  if (find.length >2){
    console.log(find);
    getWeather(find)
  }
}

// Check if geolocation is supported by the browser
if ("geolocation" in navigator) {
  // Prompt user for permission to access their location
  navigator.geolocation.getCurrentPosition(
    // Success callback function
    (position) => {
      // Get the user's latitude and longitude coordinates
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      let locaition = `${lat},${lng}`
      getWeather(locaition)

    },
    // Error callback function
    (error) => {
      // Handle errors, e.g. user denied location sharing permissions
      console.error("Error getting user location:", error);
    }
  );
} else {
  // Geolocation is not supported by the browser
  console.error("Geolocation is not supported by this browser.");
}





