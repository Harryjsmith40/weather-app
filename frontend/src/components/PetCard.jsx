import React from "react";
import nimHappy from "../assets/nim-happy.png";
import nimCold from "../assets/nim-cold.png";
import nimRainy from "../assets/nim-rainy.png";

function PetCard({ weatherData }) {
  const { weather, loading } = weatherData;
  if (loading || !weather) return null;

  const main = weather?.current?.weather?.[0]?.main?.toLowerCase() || "clear";
  const temp = weather?.current?.temp ?? 15;

  let mood = {
    image: nimHappy,
    text: "The sun tickles my feathers! ☀️",
    name: "Nim feels happy!",
  };

  if (main.includes("snow"))
    mood = {
      image: nimCold,
      text: "It’s snowing! My favorite! ❄️",
      name: "Nim feels joyful!",
    };
  else if (main.includes("rain"))
    mood = {
      image: nimRainy,
      text: "Raindrops make me want to nap. 💧",
      name: "Nim feels sleepy!",
    };
  else if (temp < 5)
    mood = {
      image: nimCold,
      text: "Brrr... where’s my scarf?",
      name: "Nim feels freezing!",
    };
  else if (temp > 25)
    mood = {
      image: nimHappy,
      text: "It’s warm! Perfect for sunbathing. ☀️",
      name: "Nim feels toasty!",
    };

  return (
    <div className="bg-white/70 backdrop-blur-xl shadow-lg rounded-3xl p-6 sm:p-8 mt-8 flex flex-col items-center">
      <img
        src={mood.image}
        alt="Nim the Penguin"
        className="w-32 h-32 sm:w-44 sm:h-44 mb-3 drop-shadow-md"
      />
      <h2 className="text-xl sm:text-2xl font-semibold mb-1">{mood.name}</h2>
      <p className="text-sm sm:text-base text-gray-600 italic text-center">
        {mood.text}
      </p>
    </div>
  );
}

export default React.memo(PetCard);
