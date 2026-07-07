// Uses Open-Meteo (free, no API key required)
// Docs: https://open-meteo.com/en/docs

export const getCurrentWeather = async (req, res, next) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      res.status(400);
      throw new Error("lat and lon query params are required");
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code`;

    const response = await fetch(url);
    if (!response.ok) {
      res.status(502);
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    const current = data.current;

    res.json({
      success: true,
      data: {
        temperature: current.temperature_2m,
        humidity: current.relative_humidity_2m,
        rainProbability: current.precipitation_probability,
        weatherCode: current.weather_code,
      },
    });
  } catch (err) {
    next(err);
  }
};
