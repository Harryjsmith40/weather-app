import React, { useState } from "react";
import { Line } from "react-chartjs-2"; // Import Line chart from react-chartjs-2
import "chart.js/auto"; // Required for chart.js

function ForecastDaily({ weatherData, settings }) {
  const { weather, loading } = weatherData;
  if (loading || !weather) return null;

  const useF = settings?.units === "imperial";
  const days = weather.daily?.slice(0, 10) || [];
  const hourlyData = weather.hourly || []; // Hourly data from the backend

  const formatTemp = (tempC) => {
    if (typeof tempC !== "number") return "--";
    const v = useF ? (tempC * 9) / 5 + 32 : tempC;
    return `${v.toFixed(0)}°${useF ? "F" : "C"}`;
  };

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedDay, setSelectedDay] = useState(null); // State for the selected day

  const openModal = (day) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDay(null);
    setIsModalOpen(false);
  };

  // Prepare data for the graph
  const graphData = selectedDay
    ? {
        labels: hourlyData
          .filter((hour) => {
            const hourDate = new Date(hour.dt * 1000);
            const dayDate = new Date(selectedDay.dt * 1000);
            return hourDate.toDateString() === dayDate.toDateString(); // Match the day
          })
          .map((hour) =>
            new Date(hour.dt * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          ), // X-axis labels (time of day)
        datasets: [
          {
            label: "Temperature",
            data: hourlyData
              .filter((hour) => {
                const hourDate = new Date(hour.dt * 1000);
                const dayDate = new Date(selectedDay.dt * 1000);
                return hourDate.toDateString() === dayDate.toDateString(); // Match the day
              })
              .map((hour) => (useF ? (hour.temp * 9) / 5 + 32 : hour.temp)), // Y-axis data (temperature)
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            tension: 0.4, // Smooth curve
          },
        ],
      }
    : null;

  const graphOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Hour of the Day",
        },
      },
      y: {
        title: {
          display: true,
          text: `Temperature (${useF ? "°F" : "°C"})`,
        },
      },
    },
  };

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
              className="flex justify-between items-center border-b border-gray-200 pb-1 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => openModal(day)} // Pass day data to the modal
            >
              <p className="text-gray-600 w-16">{date}</p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
                className="w-8 h-8"
              />
              <p className="text-grey-800 font-medium">
                {formatTemp(day.temp.max)} / {formatTemp(day.temp.min)}
              </p>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && selectedDay && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={closeModal} // Close modal when clicking outside the modal content
        >
          <div
            className="bg-white/90 rounded-lg shadow-lg p-8 w-full max-w-3xl h-[60vh] overflow-y-auto"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            onClick={(e) => e.stopPropagation()} // Prevent click event from bubbling up
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {new Date(selectedDay.dt * 1000).toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </h2>

            {/* Graph */}
            {graphData && (
              <div className="mb-6">
                <Line data={graphData} options={graphOptions} />
              </div>
            )}

            {/* Close button */}
            <div className="sticky bottom-0 bg-white pt-4">
              <button
                onClick={closeModal}
                className="mt-4 px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(ForecastDaily);