import { useState } from "react";
import { motion } from "framer-motion";

import WeatherCard from "./components/WeatherCard";
import PetCard from "./components/PetCard";
import ForecastHourly from "./components/ForecastHourly";
import ForecastDaily from "./components/ForecastDaily";
import TodayDetails from "./components/TodayDetails";
import SettingsPage from "./components/SettingsPage";
// import AdvancedSections from "./components/AdvancedSections"; // optional

import useWeatherData from "./hooks/useWeatherData";
import useSettings from "./hooks/useSettings";

export default function App() {
  // Settings are ALWAYS available now
  const { settings, updateSetting, resetSettings, clearWeatherCache } =
    useSettings();

  // Weather refresh interval comes from settings
  const weatherData = useWeatherData(settings.refreshIntervalMinutes);

  const [showSettings, setShowSettings] = useState(false);

  const animationsOn = settings.animations !== false;

  const motionProps = (delay = 0) =>
    animationsOn
      ? {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay },
        }
      : {
          initial: false,
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0 },
        };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-indigo-100 to-white flex flex-col items-center text-gray-800 overflow-y-auto pb-10">
      
      {/* Top bar */}
      <header className="w-full max-w-2xl flex items-center justify-between mt-4 px-4">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold">Nim&apos;s Weather</h1>
          <p className="text-xs text-gray-600">
            Personal penguin-powered forecast
          </p>
        </div>

        <button
          onClick={() => setShowSettings((prev) => !prev)}
          className="text-xs sm:text-sm px-3 py-1 rounded-full border border-sky-400 bg-white/70 shadow-sm hover:bg-sky-50 transition"
        >
          {showSettings ? "Back" : "Settings"}
        </button>
      </header>

      {/* Main content */}
      <main className="w-full max-w-2xl mt-4 px-4">
        {showSettings ? (
          // SETTINGS PAGE
          <SettingsPage
            settings={settings}
            updateSetting={updateSetting}
            resetSettings={resetSettings}
            clearWeatherCache={clearWeatherCache}
          />
        ) : (
          // WEATHER UI
          <div className="space-y-6 sm:space-y-8">
            <motion.div {...motionProps(0)}>
              <WeatherCard weatherData={weatherData} settings={settings} />
            </motion.div>

            <motion.div {...motionProps(0.2)}>
              <PetCard weatherData={weatherData} settings={settings} />
            </motion.div>

            <motion.div {...motionProps(0.8)}>
              <TodayDetails weatherData={weatherData} settings={settings} />
            </motion.div>

            <motion.div {...motionProps(0.4)}>
              <ForecastHourly weatherData={weatherData} settings={settings} />
            </motion.div>

            <motion.div {...motionProps(0.6)}>
              <ForecastDaily weatherData={weatherData} settings={settings} />
            </motion.div>

          </div>
        )}
      </main>
    </div>
  );
}
