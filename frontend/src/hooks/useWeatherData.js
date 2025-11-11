import { useState, useEffect, useRef } from "react";

function distanceInMiles(lat1, lon1, lat2, lon2) {
  const R = 3958.8;
  const toRad = (x) => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export default function useWeatherData() {
  const [weather, setWeather] = useState(() => {
    const cached = localStorage.getItem("nim_last_weather");
    return cached ? JSON.parse(cached) : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState(() => {
    const saved = localStorage.getItem("nim_last_coords");
    return saved ? JSON.parse(saved) : null;
  });
  const [lastUpdated, setLastUpdated] = useState(() => {
    const stored = localStorage.getItem("nim_last_updated");
    return stored ? parseInt(stored) : null;
  });

  const lastFetchRef = useRef(0);
  const didFetch = useRef(false);

  // 🧭 Get location (and only update if moved > 100 miles)
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newCoords = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        if (
          !coords ||
          distanceInMiles(coords.lat, coords.lon, newCoords.lat, newCoords.lon) > 100
        ) {
          setCoords(newCoords);
          localStorage.setItem("nim_last_coords", JSON.stringify(newCoords));
        }
      },
      (err) => console.warn("Geolocation error:", err)
    );
  }, []);

  // 🌤 Fetch weather (once per hour or on coords change)
  useEffect(() => {
    if (!coords || didFetch.current) return;

    async function fetchWeather() {
      try {
        setLoading(true);
        const response = await fetch(
  `https://weather-backend.onrender.com/weather?lat=${coords.lat}&lon=${coords.lon}`
	);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        setWeather(data);
        localStorage.setItem("nim_last_weather", JSON.stringify(data));
        lastFetchRef.current = Date.now();
        didFetch.current = true;
        setLastUpdated(Date.now());
        localStorage.setItem("nim_last_updated", Date.now().toString());
      } catch (err) {
        const cached = localStorage.getItem("nim_last_weather");
        if (cached) {
          setWeather(JSON.parse(cached));
          console.warn("Using cached weather data (offline mode)");
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();

    const oneHour = 60 * 60 * 1000;
    const topOfHour = oneHour - (Date.now() % oneHour);
    const hourlyTimer = setTimeout(() => {
      didFetch.current = false;
    }, topOfHour);

    return () => clearTimeout(hourlyTimer);
  }, [coords]);

  return { weather, loading, error, coords, lastUpdated };
}
