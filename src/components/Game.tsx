import { useEffect, useState } from "react";
import { getRandomPokemon } from "../services/getPokemon";
import { normalize, baseName, formatNameFromAPI } from "../utils/pokemonName";
import { playCry } from "../utils/audio";
import Pokemon from "../interfaces/Pokemon";

export default function Game() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const fetchPokemon = async () => {
    const random = await getRandomPokemon();
    setPokemon(random);
    setRevealed(false);
    setGuess("");
  };

  const handleGuess = () => {
    if (!pokemon) return;

    const cleanGuess = normalize(guess);
    const cleanName = normalize(baseName(pokemon.name));

    if (cleanGuess === cleanName) {
      setScore(score + 1);
      setRevealed(true);
      playCry(pokemon.id);
    } else {
      alert("¡Nope! Intenta de nuevo.");
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 space-y-8">
      
      {/* Header */}
      <header className="w-full text-center py-6">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-400 drop-shadow-lg">
          ¿Quién es ese Pokémon?
        </h1>
      </header>

      {/* Imagen */}
      {pokemon && (
        <div className="w-64 h-64 flex items-center justify-center">
          <img
            src={pokemon.sprite}
            alt="Pokemon silhouette"
            className={`transition-all duration-500 ${
              revealed ? "" : "filter brightness-0 saturate-0 opacity-80"
            }`}
          />
        </div>
      )}

      {/* Input y botones */}
      <div className="flex flex-col items-center w-full max-w-md space-y-6">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="¿Cuál es su nombre?"
          className="w-full px-5 py-3 text-lg rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          disabled={revealed}
        />

        <div className="flex flex-col md:flex-row w-full gap-4">
          <button
            onClick={handleGuess}
            className="flex-1 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white text-lg rounded-lg font-semibold transition-all disabled:opacity-50"
            disabled={revealed}
          >
            ¡Adivinar!
          </button>

          <button
            onClick={fetchPokemon}
            className="flex-1 px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 text-lg rounded-lg font-semibold transition-all"
          >
            Cambiar Pokémon
          </button>
        </div>
      </div>

      {/* Mensaje de feedback */}
      {revealed && pokemon && (
        <div className="text-center space-y-2">
          <p className="text-2xl font-bold text-green-400">
            ¡Correcto! Es {formatNameFromAPI(pokemon.name)}!
          </p>
        </div>
      )}

      {/* Score */}
      <footer className="mt-8">
        <p className="text-xl font-medium text-indigo-300">Puntaje: {score}</p>
      </footer>
    </div>
  );
}
