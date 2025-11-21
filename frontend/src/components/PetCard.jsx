// src/components/PetCard.jsx

import nimHappy from "../assets/nim-happy.png";
import nimCold from "../assets/nim-cold.png";
import nimRainy from "../assets/nim-rainy.png";
import nimFoggy from "../assets/nim-foggy.png";
import nimHot from "../assets/nim-hot.png";
import nimWindy from "../assets/nim-windy.png";
import nimStorm from "../assets/nim-storm.png";

export default function PetCard({ weatherData, settings }) {
  const { weather, loading } = weatherData;
  if (loading || !weather) return null;

  const temp = weather.current?.temp ?? 0;
  const condition = weather.current?.weather?.[0]?.main ?? "Clear";

  // ------------------------------
  // 🐧 Nim's Mood Engine (your logic)
  // ------------------------------

  let mood = {
    image: nimHappy,
    name: "Nim feels happy!",
    text: "The weather is just right for feathers.",
  };

  if (temp < 5) {
    mood = {
      image: nimCold,
      name: "Nim feels chilly…",
      text: "Brrr! It’s very cold today.",
    };
  } else if (temp > 30) {
    mood = {
      image: nimHot,
      name: "Nim is overheating!",
      text: "Too hot for a penguin right now!",
    };
  }

  if (condition === "Rain") {
    mood = {
      image: nimRainy,
      name: "Nim feels sleepy...",
      text: "Raindrops make such cozy sounds.",
    };
  } else if (condition === "Fog") {
    mood = {
      image: nimFoggy,
      name: "Nim is confused…",
      text: "Where did everything go??",
    };
  } else if (condition === "Thunderstorm") {
    mood = {
      image: nimStorm,
      name: "Nim is frightened!",
      text: "Thunder is scary! Stay close!",
    };
  } else if (condition === "Wind") {
    mood = {
      image: nimWindy,
      name: "Nim is annoyed…",
      text: "Wind keeps flipping my feathers!",
    };
  }

  // ------------------------------
  // UI Card
  // ------------------------------

  return (
    <div
      className="
        bg-white/70 backdrop-blur-xl 
        rounded-3xl 
        shadow-[0_8px_30px_rgba(0,0,0,0.05)]
        transition-all duration-300 
        p-6 sm:p-8 
        flex flex-col items-center text-center
      "
    >
      <img
        src={mood.image}
        alt="Nim"
        className="w-32 h-32 sm:w-44 sm:h-44 mb-3 drop-shadow-md"
      />

      <h2 className="text-xl sm:text-2xl font-semibold mb-1">
        {mood.name}
      </h2>

      <p className="text-sm sm:text-base text-gray-600 italic">
        {mood.text}
      </p>
    </div>
  );
}
