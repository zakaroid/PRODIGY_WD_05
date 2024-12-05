// Declaring Variables  


// ------------------------------------------------------------------------------------------------------------

// Variables for Hamburger 
let leftContainer = document.querySelector(".left-section");
let hamburger = document.querySelector("#hamburger");  // elements with id can be directly used without declaring variables, but i did it for understandable and maintainable code
let cross = document.querySelector("#cross");

// Variables for Weather Card 
let todayTemp = document.querySelector(".today-temp");
let feelsLike = document.querySelector(".feels-like");
let cityName = document.querySelector(".city-name");
let countryName = document.querySelector(".country-name");
let tempImg = document.querySelector(".temperature-image");
let tempConditions = document.querySelector(".temp-condition");



// Variables for todays highlights cards 

// humidity 
let humidity = document.querySelector("#humidity");
let humidityCondition = document.querySelector("#humidity-condition");

// Wind Speed 
let windSpeed = document.querySelector("#wind-speed");
let windSpeedDirection = document.querySelector("#wind-speed-direction");

// UV Index 
let uvIndex = document.querySelector("#uv-index");
let uvIndexCondition = document.querySelector("#uv-index-condition");

// Sunrise and Sunset 
let sunrise = document.querySelector("#sunrise");
let sunset = document.querySelector("#sunset");

// Visibility 
let visibility = document.querySelector("#visibility");
let visibilityCondition = document.querySelector("#visibility-condition");

// Highest ad lowest temperature 
let highestTemperature = document.querySelector("#highest-temp");
let lowestTemperature = document.querySelector("#lowest-temp");
// --------------------------------------------------------------------------------------

// Variables for Search Bar 
let search = document.querySelector("#search");
let go = document.querySelector("#go");


// Variables for cards div 
let cardsDiv = document.querySelector(".cards")


// Variables for Toast bar 
let toastBar = document.querySelector(".toast-bar");
let toastCrossButton = document.querySelector("#error-cross");















// Making the Hamburger Animation 

// ----------------------------------------
hamburger.addEventListener("click", ()=>{
    leftContainer.style.left = "0%"
});
cross.addEventListener("click", ()=>{
    leftContainer.style.left = "-200%"
});
//------------------------------------------









// Creating Forecast cards of the left section 
const createCard =(date, month, conditionSrc, condition, tempmax,tempmin)=>{
    let div = `<div class="card">
    <div class="card-condition">
        <div class="card-date">${date}/${month}</div>
        <div class="condition-img"><img src="./assets/${conditionSrc}.svg" alt=""></div>
    </div>
    <div class="condition-text">${condition}</div>
    <div class="card-temp">${tempmax}/${tempmin}</div>
</div>`

cardsDiv.innerHTML+= div
}

// createCard(27,11,"cloudy","Clear",21,90)









// Fetching the weather from the weather API by making an async function "getWeather()" it fetches the weather and then
// changes all the values accordingly like the temperature, feels like, city name, country name, image, weather condition
// humidity, wind speed, uv index, sunset sunrise, visibility, highest and lowest temperature









// ------------------------------------------------------------------------------------------------------------------

async function getWeather(location){
    // fetching the api 

    try{
    let rawData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=LR8PRXD6LNKSNLY5K8TXU7ESV&contentType=json`);


    // converting raw data to json 
    let data = await rawData.json();
    let todayWeather = data.currentConditions;
    
    console.log(data)
    console.log(todayWeather)


    // inserting the data into the website elements
    
    // Elements of weather card  
    todayTemp.innerHTML = todayWeather.temp + "°C"
    feelsLike.innerHTML = `Feels Like ${todayWeather.feelslike}°C`
    cityName.innerHTML = data.resolvedAddress.split(',')[0] 
    countryName.innerHTML = data.resolvedAddress.split(',')[data.resolvedAddress.split(',').length-1]
    tempConditions.innerHTML = todayWeather.conditions
    


    // changing the image according to the weather 
    
    // ---------------------------------------------------------------------------
    if (todayWeather.conditions.toLowerCase().includes("cloud")){
        tempImg.src = "./assets/cloudy.svg"
    }
    else if (todayWeather.conditions.toLowerCase().includes("rain")){
        tempImg.src = "./assets/rain.svg"
    }
    else if (todayWeather.conditions.toLowerCase().includes("snow")){
        tempImg.src = "./assets/snow.svg"
    }
    else if (todayWeather.conditions.toLowerCase().includes("clear")){
        tempImg.src = "./assets/clear.svg"
    }
    else if (todayWeather.conditions.toLowerCase().includes("overcast")){
        tempImg.src = "./assets/overcast.svg"
    }
    else if (todayWeather.conditions.toLowerCase().includes("humid")){
        tempImg.src = "./assets/humid.svg"
    }
    else{
        tempImg.src = "./assets/else.svg"
    }
    // ---------------------------------------------------------------------------
    

    // Elements of todays highlights cards 

    // humidity 
    humidity.innerHTML = todayWeather.humidity + "%"


    // logic for changing humidity condition according to the numbers 

    // -------------------------------------------------
    if (todayWeather.humidity < 20) {
        humidityCondition.innerHTML = "Dryness";
    } else if (todayWeather.humidity < 60) {
        humidityCondition.innerHTML = "Normal";
    } else {
        humidityCondition.innerHTML = "Too High";
    }
    // -------------------------------------------------

    // wind Speed
    windSpeed.innerHTML = todayWeather.windspeed + "Km/h"
    windSpeedDirection.innerHTML = degToCompass(todayWeather.winddir)

    // uv index 
    uvIndex.innerHTML = todayWeather.uvindex

    // Logic to get the measurement of uv index 
    // ---------------------------------------------
    if (todayWeather.uvindex < 3){
        uvIndexCondition.innerHTML = "mW/cm2 | Low"
    }
    else if (todayWeather.uvindex < 6){
        uvIndexCondition.innerHTML = "mW/cm2 | Moderate"
    }
    else if (todayWeather.uvindex < 8){
        uvIndexCondition.innerHTML = "mW/cm2 | High"
    }
    else{
        uvIndexCondition.innerHTML = "mW/cm2 | Very High"
    }
    // ---------------------------------------------


    // sunrise and sunset 
    sunrise.innerHTML = todayWeather.sunrise.slice(0,5)
    sunset.innerHTML = todayWeather.sunset.slice(0,5)

    // visibility 
    visibility.innerHTML = todayWeather.visibility + "km"


    // logic for setting visibility Condition

    // ---------------------------------------------
    if (todayWeather.visibility < 0.20){
        visibilityCondition.innerHTML = "Thick"
    }
    else if (todayWeather.visibility <0.50){
        visibilityCondition.innerHTML = "Moderate"
    }
    else if (todayWeather.visibility <1.00){
        visibilityCondition.innerHTML = "Light"
    }
    else if (todayWeather.visibility <10.00){
        visibilityCondition.innerHTML = "Mist"
    }
    else{
        visibilityCondition.innerHTML = "Clear"
    }
    // ---------------------------------------------


    // Highest and lowest temperature 
    highestTemperature.innerHTML = data.days[0].tempmax + "°C"
    lowestTemperature.innerHTML = data.days[0].tempmin + "°C"



    // Clearing cards div before changing location so, they dont keep adding up 
    cardsDiv.innerHTML=""

    // Creating cards based on their weather conditions 
    for (i=0; i<15; i++){
        if (data.days[i].conditions.toLowerCase().includes("cloud")){
            createCard(data.days[i].datetime.split("-")[2],data.days[i].datetime.split("-")[1],"cloudy",data.days[i].conditions,data.days[i].tempmax.toString().slice(0,2),data.days[i].tempmin.toString().slice(0,2))
        }
        else if (data.days[i].conditions.toLowerCase().includes("rain")){
            createCard(data.days[i].datetime.split("-")[2],data.days[i].datetime.split("-")[1],"rain",data.days[i].conditions,data.days[i].tempmax.toString().slice(0,2),data.days[i].tempmin.toString().slice(0,2))
        }
        else if (data.days[i].conditions.toLowerCase().includes("snow")){
            createCard(data.days[i].datetime.split("-")[2],data.days[i].datetime.split("-")[1],"snow",data.days[i].conditions,data.days[i].tempmax.toString().slice(0,2),data.days[i].tempmin.toString().slice(0,2))
        }
        else if (data.days[i].conditions.toLowerCase().includes("clear")){
            createCard(data.days[i].datetime.split("-")[2],data.days[i].datetime.split("-")[1],"clear",data.days[i].conditions,data.days[i].tempmax.toString().slice(0,2),data.days[i].tempmin.toString().slice(0,2))
        }
        else if (data.days[i].conditions.toLowerCase().includes("overcast")){
            createCard(data.days[i].datetime.split("-")[2],data.days[i].datetime.split("-")[1],"overcast",data.days[i].conditions,data.days[i].tempmax.toString().slice(0,2),data.days[i].tempmin.toString().slice(0,2))
        }
        else if (data.days[i].conditions.toLowerCase().includes("humid")){
            createCard(data.days[i].datetime.split("-")[2],data.days[i].datetime.split("-")[1],"humid",data.days[i].conditions,data.days[i].tempmax.toString().slice(0,2),data.days[i].tempmin.toString().slice(0,2))
        }
        else{
            createCard(data.days[i].datetime.split("-")[2],data.days[i].datetime.split("-")[1],"else",data.days[i].conditions,data.days[i].tempmax.toString().slice(0,2),data.days[i].tempmin.toString().slice(0,2))
        }
    }

}catch{
    // Catching the error if user enters invalid location 
    if (window.matchMedia("(max-width: 780px)").matches) {
        toastBar.style.top= "5.625rem"
        // Viewport is less or equal to 780 pixels wide
      } else {
        // Viewport is greater than 780 pixels wide
        toastBar.style.top= "1.875rem"
      }
}


}

// ------------------------------------------------------------------------------------------------------------------













async function main(){

    // Adding logic to detect the location from the search bar when key enter is pressed 
        search.addEventListener("keypress", async function (e) {
            if (e.key === "Enter") {
                let location = search.value;
                // calling the get weather function in an async function as async func can only be called in another sync func 
                await getWeather(location);
            }
        });
    

    
    // Adding logic to detect the location from the search bar in mobile devices when go arrow button is pressed 

        go.addEventListener("click", async function (e) {
            let location = search.value;
            await getWeather(location);
        })
    
}

main()













// function for calculating the wind speed direction 
function degToCompass(num) {
    let value = Math.floor(num / 22.5 + 0.5);
    let arr = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW",
    ];
    return arr[value % 16];
}



// Making the toast cross btn work 
toastCrossButton.addEventListener("click", ()=>{
    toastBar.style.top = "-200%";
})