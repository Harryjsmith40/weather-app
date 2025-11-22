import { useState } from "react";
import { Line } from "react-chartjs-2"; // Import Line chart from react-chartjs-2
import "chart.js/auto"; // Required for chart.js

export default function ForecastHourly({ weatherData, settings }) {
  const { weather, loading } = weatherData;
  if (loading || !weather) return null;

  const useF = settings.units === "imperial";
  const hours = weather.hourly?.slice(0, 12) ?? [];

  const formatTemp = (t) =>
    useF ? `${((t * 9) / 5 + 32).toFixed(0)}°F` : `${t.toFixed(0)}°C`;

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Prepare data for the graph
  const graphData = {
    labels: hours.map((hour) =>
      new Date(hour.dt * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    ), // X-axis labels (time of day)
    datasets: [
      {
        label: "Temperature",
        data: hours.map((hour) => (useF ? (hour.temp * 9) / 5 + 32 : hour.temp)), // Y-axis data (temperature)
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const lowestTemp = Math.min(...graphData.datasets[0].data);
  const highestTemp = Math.max(...graphData.datasets[0].data);

  const graphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Time of Day",
        },
      },
      y: {
        min: Math.min(5, lowestTemp - 3),
        max: Math.max(35, highestTemp + 3),
        title: {
          display: true,
          text: `Temperature (${useF ? "°F" : "°C"})`,
        },
      },
    },
  };

  return (
    <div
      className="
        rounded-3xl p-5 sm:p-6
      "
      onClick={openModal} // Open modal when the entire card section is clicked
    >
      <div className="flex items-center justify-center gap-2 mb-3">
        <h3 className="text-xl font-semibold text-gray-800">
          Next 12 Hours
        </h3>
      </div>

      <div className="flex overflow-x-auto gap-4 pb-2">
        {hours.map((hour) => {
          const time = new Date(hour.dt * 1000).getHours();
          return (
            <div
              key={hour.dt}
              className="
                flex flex-col items-center 
                min-w-[60px] 
                bg-white/50 
                rounded-xl 
                p-2
                shadow-sm
              "
            >
              <p className="text-xs text-gray-500">{time}:00</p>
              <img
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                className="w-8 h-8"
                alt={hour.weather[0].description}
              />
              <p className="text-gray-700 font-medium">
                {formatTemp(hour.temp)}
              </p>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={closeModal} // Close modal when clicking outside the modal content
        >
          <div
            className="bg-white/80 rounded-lg shadow-lg p-8 w-full max-w-3xl h-[60vh] overflow-y-auto"
            style={{
              height: "60vh",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            onClick={(e) => e.stopPropagation()} // Prevent click event from bubbling up
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Today's Weather Details
            </h2>

            {/* Graph */}
            <div className="mb-6"
            style={{ height: "500px" }}
            >
              <Line data={graphData} options={graphOptions} />
            </div>

            {/* Close button */}
            <div className="sticky flex justify-center">
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