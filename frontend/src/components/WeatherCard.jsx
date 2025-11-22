import { ThermometerSun, MapPin, Cloud } from "lucide-react";

export default function WeatherCard({ weatherData, settings }) {
  const { weather, loading, error, lastUpdated } = weatherData;

  if (loading) return <p className="text-gray-600 italic mt-10">Loading...</p>;
  if (error) return <p className="text-red-600 mt-10">Error: {error}</p>;

  const useF = settings.units === "imperial";
  const city = weather.location || "Unknown";

  const tempC = weather.current?.temp;
  const tempValue = useF ? (tempC * 9) / 5 + 32 : tempC;
  const temp = tempValue?.toFixed(1);
  const tempUnit = useF ? "°F" : "°C";

  const condition = weather.current?.weather?.[0]?.description || "Unknown";
  const icon = weather.current?.weather?.[0]?.icon;

  const minutesAgo =
    lastUpdated && Math.floor((Date.now() - lastUpdated) / 60000);

  return (
    <div
      className="
        bg-none
        transition-all duration-300 
        rounded-3xl 
        p-6 sm:p-2 
        flex flex-col items-center text-center
      "
    >
      {/* Location */}
      <div className="flex items-center gap-1 text-gray-700 mb-2">
        <MapPin size={18} />
        <h1 className="text-xl font-semibold">{city}</h1>
      </div>

      {/* Temperature */}
      <div className="flex items-center gap-2">
        <ThermometerSun size={36} className="text-sky-600" />
        <p className="text-6xl font-bold text-sky-700">
          {temp}
          {tempUnit}
        </p>
      </div>

      {/* Condition */}
      <div className="mt-1 flex items-center gap-2 text-gray-600 capitalize">
        <Cloud size={18} />
        <span className="text-lg">{condition}</span>
        {icon && (
          <img
            src={`https://openweathermap.org/img/wn/${icon}.png`}
            alt={condition}
            className="w-10 h-10"
          />
        )}
      </div>

      {/* Last updated */}
      {minutesAgo !== null && (
        <p className="text-xs text-gray-500 italic mt-3">
          {minutesAgo < 1 ? "Just updated" : `Updated ${minutesAgo}m ago`}
        </p>
      )}
    </div>
  );
}
