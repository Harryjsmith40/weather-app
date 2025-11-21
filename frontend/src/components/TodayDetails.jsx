import { useState } from "react";

export default function TodayDetails({ weatherData, settings }) {
  const { weather, loading } = weatherData;
  if (loading || !weather) return null;

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const current = weather.current;
  const today = weather.daily?.[0];

  const useF = settings?.units === "imperial";
  const unitLabel = useF ? "°F" : "°C";

  const toTemp = (c) => {
    if (typeof c !== "number") return "--";
    const v = useF ? (c * 9) / 5 + 32 : c;
    return v.toFixed(1);
  };

  const preview = [
    `${current.wind_speed.toFixed(0)} km/h winds`,
    `${current.humidity}% humidity`,
    `UV ${current.uvi}`,
  ].join(" · ");

  const sunrise = new Date(current.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const sunset = new Date(current.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="w-full space-y-4">
      {/* Button to open the modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition"
      >
        Show Today's Details
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Today's Details
            </h2>
              <div className="mb-3">
                <h4 className="font-semibold text-slate-800 mb-1">
                  Temperature
                </h4>
                <p>
                  Feels like:{" "}
                  <strong>
                    {toTemp(current.feels_like)}
                    {unitLabel}
                  </strong>
                </p>
                <p>
                  High:{" "}
                  <strong>
                    {toTemp(today.temp.max)}
                    {unitLabel}
                  </strong>{" "}
                  · Low:{" "}
                  <strong>
                    {toTemp(today.temp.min)}
                    {unitLabel}
                  </strong>
                </p>
              </div>

              <div className="mb-3">
                <h4 className="font-semibold text-slate-800 mb-1">Wind</h4>
                <p>
                  Speed: <strong>{current.wind_speed} km/h</strong>
                </p>
                <p>
                  Direction: <strong>{current.wind_deg}°</strong>
                </p>
              </div>

              <div className="mb-3">
                <h4 className="font-semibold text-slate-800 mb-1">
                  Atmosphere
                </h4>
                <p>
                  Humidity: <strong>{current.humidity}%</strong>
                </p>
                <p>
                  Pressure: <strong>{current.pressure} hPa</strong>
                </p>
                <p>
                  Visibility:{" "}
                  <strong>
                    {(current.visibility / 1000).toFixed(1)} km
                  </strong>
                </p>
              </div>

              <div className="mb-2">
                <h4 className="font-semibold text-slate-800 mb-1">Sun</h4>
                <p>
                  Sunrise: <strong>{sunrise}</strong>
                </p>
                <p>
                  Sunset: <strong>{sunset}</strong>
                </p>
              </div>

            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}