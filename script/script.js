// http://api.weatherapi.com/v1/current.json?key=13a7288feafb48f5aee210533242807&q=Lagos&aqi=no

const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".t-l p");
const dateandTimeField = document.querySelector(".t-l span");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const searchButton = document.querySelector(".search_button");
const form = document.querySelector('form');

form.addEventListener('submit', searchForLocation);

let target = 'Kaduna';

const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=13a7288feafb48f5aee210533242807&q=${targetLocation}&aqi=no`;

    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    let locationName = data.location.name;
    let time = data.location.localtime;

    let temp = data.current.temp_c;
    let condition = data.current.condition.text;

    updateDetails(temp, locationName, time, condition);
}

function updateDetails(temp, locationName, time, condition) {
    let splitDate = time.split(' ')[0];
    let splitTime = time.split(' ')[1];

    let currentDay = getDayName(new Date(splitDate).getDay());

    temperatureField.innerText = temp;
    locationField.innerText = locationName;
    dateandTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionField.innerText = condition;
}

function searchForLocation(e) {
    e.preventDefault();

    target = searchField.value;
    fetchResults(target);
}

fetchResults(target);

function getDayName(dayNumber) {
    switch(dayNumber) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
        default:
            return 'Invalid day';
    }
}
