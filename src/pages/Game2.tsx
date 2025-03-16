
import { useState } from "react";

const TOKEN = "1014333022960709";
const BASE_URL = `https://superheroapi.com/api.php/${TOKEN}`;

export default function Game2() {
  const [hero, setHero] = useState<{ name: string; image: string; powerstats: any } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  async function getSuperhero(id: number) {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      const data = await response.json();
      if (data.response === "success") {
        setHero({
          name: data.name,
          image: data.image.url,
          powerstats: data.powerstats,
        });
      }
    } catch (error) {
      console.error("Error fetching superhero:", error);
    }
  }

  async function getSearch(name: string) {
    try {
      const response = await fetch(`${BASE_URL}/search/${name}`);
      const data = await response.json();
      if (data.response === "success" && data.results.length > 0) {
        const hiro = data.results[0];
        setHero({
          name: hiro.name,
          image: hiro.image.url,
          powerstats: hiro.powerstats,
        });
      }
    } catch (error) {
      console.error("Error fetching superhero:", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6 space-y-6">
      <h1 className="text-4xl font-bold tracking-wide text-blue-400">Superhero Finder</h1>
      <div className="flex space-x-4 w-full max-w-md">
        <input
          type="text"
          className="flex-1 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Search for a superhero..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 transition rounded-lg" onClick={() => getSearch(searchTerm)}>
          Search
        </button>
        <button className="px-4 py-2 bg-green-600 hover:bg-green-500 transition rounded-lg" onClick={() => getSuperhero(Math.floor(Math.random() * 731))}>
          Random Hero
        </button>
      </div>
      {hero && (
        <div className="w-full max-w-md bg-gray-800 text-white rounded-lg shadow-xl overflow-hidden p-6 text-center">
          <h2 className="text-3xl font-semibold text-blue-400 mb-3">{hero.name}</h2>
          <img src={hero.image} alt={hero.name} className="w-48 h-48 rounded-lg shadow-md border-4 border-blue-500 mx-auto" />
          <div className="mt-4 text-lg">
            <p className="text-yellow-400">⚡ Power: {hero.powerstats.power}</p>
            <p className="text-green-400">🧠 Intelligence: {hero.powerstats.intelligence}</p>
            <p className="text-red-400">⚔ Combat: {hero.powerstats.combat}</p>
          </div>
        </div>
      )}
    </div>
  );
}
