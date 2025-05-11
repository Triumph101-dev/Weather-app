const apiKey = "46c2d043a9f94b8b0f029638e8581fb5";

    async function getWeather() {
      const city = document.getElementById("cityInput").value;
      const resultDiv = document.getElementById("weatherResult");

      if (!city) {
        resultDiv.innerHTML = "Please enter a city name.";
        return;
      }

      resultDiv.innerHTML = "Loading...";

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
          throw new Error("City not found");
        }

        const data = await response.json();
        const weatherHtml = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon" />
          <p><strong>${data.weather[0].main}</strong>: ${data.weather[0].description}</p>
          <p>Temperature: ${data.main.temp}&deg;C</p>
        `;

        resultDiv.innerHTML = weatherHtml;
      } catch (error) {
        resultDiv.innerHTML = error.message;
      }
    }