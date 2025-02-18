const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const dateAndTimeField = document.querySelector(".timeDate");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".searcharea");
const form = document.querySelector("form");
const conditionIconField = document.querySelector(".condition img");

form.addEventListener("submit", searchForLocation);
let target = "bahadurgarh";

const fetchResult = async (targetLocation) => {
    try {
        let url = `https://api.weatherapi.com/v1/current.json?key=683570b89b5a4885a7e180849251502&q=${targetLocation}&aqi=no`;
        
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Weather data fetch failed: ${res.status}`);
        }
        const data = await res.json();

        let locationName = data.location.name;
        let locationTime = data.location.localtime;
        let locatinTemp = data.current.temp_c;
        let locationCondition = data.current.condition.text;
        let conditionIcon = data.current.condition.icon;

        updateDetails(locatinTemp, locationName, locationTime, locationCondition, conditionIcon);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data. Please check the location name.");
    }
};

function updateDetails(locatinTemp, locationName, locationTime, locationCondition, conditionIcon) {
    let splitDate = locationTime.split(" ")[0];
    let splitTime = locationTime.split(" ")[1];
    let currentDay = getDayName(new Date(splitDate).getDay());

    temperatureField.innerText = `${locatinTemp}°C`;
    locationField.innerText = locationName;
    dateAndTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionField.innerText = locationCondition;

    
    conditionIconField.src = `https:${conditionIcon}`;
}

function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value.trim();
    if (target) {
        fetchResult(target);
    } else {
        alert("Please enter a location");
    }
}

fetchResult(target);

function getDayName(num) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[num] || "";
}
