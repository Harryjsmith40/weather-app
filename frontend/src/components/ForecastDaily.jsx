import React from "react";

function ForecastDaily({ weatherData, settings }) {
  const { weather, loading } = weatherData;
  if (loading || !weather) return null;

  const useF = settings?.units === "imperial";
  const days = weather.daily?.slice(0, 10) || [];

  const formatTemp = (tempC) => {
    if (typeof tempC !== "number") return "--";
    const v = useF ? (tempC * 9) / 5 + 32 : tempC;
    return `${v.toFixed(0)}°${useF ? "F" : "C"}`;
  };

  return (
    <div className="mt-8 w-full rounded-3xl p-2 sm:p-2">
      <h3 className="text-xl font-semibold mb-3 text-center">10-Day Forecast</h3>
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
                className="w-12 h-12"
              />
              <p className="text-grey-800 font-medium">
                {formatTemp(day.temp.max)} / {formatTemp(day.temp.min)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(ForecastDaily);