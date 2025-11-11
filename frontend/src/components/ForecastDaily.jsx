import React from "react";

function ForecastDaily({ weatherData }) {
  const { weather, loading } = weatherData;
  if (loading || !weather) return null;

  const days = weather.daily?.slice(0, 10) || [];

  return (
    <div className="mt-8 w-full bg-white/70 backdrop-blur-xl shadow-lg rounded-3xl p-4 sm:p-6">
      <h3 className="text-lg font-semibold mb-3 text-center">10-Day Forecast</h3>
      <div className="space-y-2">
        {days.map((day, idx) => {
          const date = new Date(day.dt * 1000).toLocaleDateString(undefined, {
            weekday: "short",
          });
          return (
            <div
              key={idx}
              className="flex justify-between items-center border-b border-gray-200 pb-1"
            >
              <p className="text-gray-600 w-16">{date}</p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
                className="w-8 h-8"
              />
              <p className="text-gray-800 font-medium">{day.temp.day.toFixed(0)}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(ForecastDaily);
