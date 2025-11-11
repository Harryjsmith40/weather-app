import { motion } from "framer-motion";
import WeatherCard from "./components/WeatherCard";
import PetCard from "./components/PetCard";
import ForecastHourly from "./components/ForecastHourly";
import ForecastDaily from "./components/ForecastDaily";
import useWeatherData from "./hooks/useWeatherData";

export default function App() {
  const weatherData = useWeatherData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-indigo-100 to-white flex flex-col items-center text-gray-800 overflow-y-auto pb-10">
      <div className="w-full max-w-2xl text-center mt-8 space-y-6 sm:space-y-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <WeatherCard weatherData={weatherData} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <PetCard weatherData={weatherData} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ForecastHourly weatherData={weatherData} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <ForecastDaily weatherData={weatherData} />
        </motion.div>
      </div>
    </div>
  );
}
