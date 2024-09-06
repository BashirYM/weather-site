const baseURL = "https://api.weatherapi.com/v1/current.json?q=";
const apiKey = "13a7288feafb48f5aee210533242807";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toISOString().split("T")[0];

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performAction);

/* Function called by event listener */
function performAction(e) {
  const location = document.getElementById("location-input").value;
  const feelings = document.getElementById("feelings").value;
  if (!location) {
    alert("Please enter a city name!");
    return;
  }

  getWeatherData(baseURL, location, apiKey)
    .then(function (data) {
      if (data && data.current && data.current.temp_c) {
        updateUI(data, feelings);
      } else {
        alert("City not found. Please try again.");
      }
    })
    .catch(function (error) {
      console.error("Error fetching data: ", error);
    });
}

/* Function to GET Web API Data */
const getWeatherData = async (baseURL, location, apiKey) => {
  try {
    const response = await fetch(`${baseURL}${location}&key=${apiKey}`);
    const data = await response.json();

    console.log("Weather Data: ", data);
    return data;
  } catch (error) {
    console.error("Error parsing response data: ", error);
  }
};

const updateUI = (data, feelings) => {
  // Update the weather details
  document.getElementById("temp").innerHTML = `${data.current.temp_c} °C`;
  document.getElementById("location").innerHTML = `${data.location.name}`;
  document.getElementById("date").innerHTML = `${newDate}`;
  document.getElementById(
    "condition"
  ).innerHTML = `${data.current.condition.text}`;
  document.getElementById("feeling-display").innerHTML = `Feeling: ${feelings}`;

  const iconUrl = `https:${data.current.condition.icon}`;
  document.getElementById("weather-icon").src = iconUrl;
  document.getElementById("weather-icon").alt = data.current.condition.text;

  // Change background based on the weather condition
  changeBackground(data.current.condition.text);
};

const changeBackground = (condition) => {
  let backgroundImage = "./media/default-weather.jpg";

  if (condition.toLowerCase().includes("rain")) {
    backgroundImage = "./media/rain.jpg";
  } else if (condition.toLowerCase().includes("sunny")) {
    backgroundImage = "./media/sunny.jpg";
  } else if (condition.toLowerCase().includes("cloudy")) {
    backgroundImage = "./media/cloudy.jpg";
  } else if (condition.toLowerCase().includes("overcast")) {
    backgroundImage = "./media/overcast.jpg";
  } else if (condition.toLowerCase().includes("snow")) {
    backgroundImage = "./media/snow.jpg";
  } else if (condition.toLowerCase().includes("thunder")) {
    backgroundImage = "./media/thunderstorm.jpg";
  } else if (condition.toLowerCase().includes("clear")) {
    backgroundImage = "./media/clear.jpg";
  }

  console.log("Changing background to: ", backgroundImage);

  // Apply the background image to the body
  document.body.style.backgroundImage = `url(${backgroundImage})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundAttachment = "fixed";
};
