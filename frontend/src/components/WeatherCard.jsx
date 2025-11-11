export default function WeatherCard({ weatherData }) {
  const { weather, loading, error, lastUpdated } = weatherData;

  if (loading) return <p className="text-gray-600 italic mt-10">Loading...</p>;
  if (error) return <p className="text-red-600 mt-10">Error: {error}</p>;

  const city = weather?.location || "Unknown";
  const temp = weather?.current?.temp?.toFixed(1) || "--";
  const condition = weather?.current?.weather?.[0]?.description || "Unknown";
  const minutesAgo =
    lastUpdated && Math.floor((Date.now() - lastUpdated) / 60000);

  return (
    <div className="flex flex-col items-center space-y-1 sm:space-y-2">
      <h1 className="text-2xl sm:text-3xl font-semibold">{city}</h1>
      <p className="text-6xl sm:text-7xl font-bold text-sky-700">{temp}°C</p>
      <p className="text-base sm:text-lg text-gray-700 capitalize">{condition}</p>
      {minutesAgo !== null && (
        <p className="text-sm text-gray-500 italic mt-1">
          {minutesAgo < 1 ? "Just updated" : `Updated ${minutesAgo} min ago`}
        </p>
      )}
    </div>
  );
}
