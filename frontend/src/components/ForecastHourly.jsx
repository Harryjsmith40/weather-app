import React from "react";

function ForecastHourly({ weatherData }) {
  const { weather, loading } = weatherData;
  if (loading || !weather) return null;

  const hours = weather.hourly?.slice(0, 12) || [];

  return (
    <div className="mt-8 w-full bg-white/70 backdrop-blur-xl shadow-lg rounded-3xl p-4 sm:p-6">
      <h3 className="text-lg font-semibold mb-3 text-center">Next 12 Hours</h3>
      <div className="flex overflow-x-auto gap-3 sm:gap-4 pb-2 px-2 sm:px-4">
        {hours.map((hour, idx) => (
          <div key={idx} className="flex flex-col items-center min-w-[50px] sm:min-w-[60px]">
            <p className="text-sm text-gray-500">
              {new Date(hour.dt * 1000).getHours()}:00
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
              alt={hour.weather[0].description}
              className="w-8 h-8"
            />
            <p className="font-medium text-gray-700">{hour.temp.toFixed(0)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(ForecastHourly);
