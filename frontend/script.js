document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(`http://localhost:4000/weather?lat=${latitude}&lon=${longitude}`);
        const weatherData = await response.json();
        displayWeather(weatherData);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  });
  
  function displayWeather(data) {
    const weatherInfoDiv = document.getElementById('weather-info');
    const { name, main: { temp, humidity } } = data;
    weatherInfoDiv.innerHTML = `
      <h2>${name}</h2>
      <p>Temperature: ${temp}°C</p>
      <p>Humidity: ${humidity}%</p>
    `;
  }