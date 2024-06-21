const express = require("express");
const axios = require("axios"); // Import the axios module
const app = express();
const port = 8000;

app.get("/", async (req, res) => {
    try {
      // Fetch weather data from the API
      const response = await axios.get("http://api.openweathermap.org/data/2.5/weather?q=Mumbai&units=metric&appid=37df94171d8a196ee7c9a78f1a853517");
  
      // Extract the data you need from the response
      const weatherData = response.data;
  
      // Read your HTML file
      const fs = require("fs");
      const html = fs.readFileSync("index.html", "utf-8");
  
      // Replace placeholders in your HTML template with weather data
      const modifiedHtml = html
        .replace("{%location%}", weatherData.name)
        .replace("{%tempval%}", weatherData.main.temp)
        .replace("{%tempmin%}", weatherData.main.temp_min)
        .replace("{%tempmax%}", weatherData.main.temp_max)
        .replace("{%tempstatus%}", weatherData.weather[0].main);
  
      // Send the modified HTML as the response
      res.send(modifiedHtml);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      res.status(500).send("An error occurred while fetching weather data.");
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
