// src/hooks/useSettings.js
import { useState, useEffect } from "react";

const STORAGE_KEY = "nim_settings_v1";

const defaultSettings = {
  units: "metric",              // "metric" or "imperial"
  theme: "system",              // "light" | "dark" | "system"
  animations: true,             // enable/disable animations
  useGps: true,                 // allow GPS
  manualLocation: "",           // override city name (future wiring)
  refreshIntervalMinutes: 60,   // how often to refresh weather
  penguinEnergy: "normal",      // calm | normal | hyper
  penguinSensitivity: "medium", // low | medium | high
};

export default function useSettings() {
  // Always return a valid settings object
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultSettings, ...JSON.parse(stored) };
      } else {
        // Save defaults immediately
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
        return defaultSettings;
      }
    } catch {
      return defaultSettings;
    }
  });

  // Save to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  function updateSetting(key, value) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  function resetSettings() {
    setSettings(defaultSettings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
  }

  function clearWeatherCache() {
    localStorage.removeItem("nim_last_weather");
    localStorage.removeItem("nim_last_coords");
    localStorage.removeItem("nim_last_updated");
  }

  return { settings, updateSetting, resetSettings, clearWeatherCache };
}
