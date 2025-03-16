import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const emojis = ["🔥", "⚡", "🌙", "❄", "💎", "🚀", "🎸", "👾"]; // Unique pairs
const shuffledEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5); // Duplicate and shuffle

export default function Game3() {
  const [cards, setCards] = useState(shuffledEmojis.map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false })));
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);

  function handleCardClick(index: number) {
    if (cards[index].flipped || flippedCards.length === 2) return; // Prevent flipping more than two at a time
    const updatedCards = cards.map((card, i) => (i === index ? { ...card, flipped: true } : card));
    setCards(updatedCards);
    setFlippedCards([...flippedCards, index]);

    if (flippedCards.length === 1) {
      checkForMatch(flippedCards[0], index);
    }
  }

  function checkForMatch(firstIndex: number, secondIndex: number) {
    const firstCard = cards[firstIndex];
    const secondCard = cards[secondIndex];

    if (firstCard.emoji === secondCard.emoji) {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((card, i) =>
            i === firstIndex || i === secondIndex ? { ...card, matched: true } : card
          )
        );
        setMatchedPairs(matchedPairs + 1);
        setFlippedCards([]);
      }, 500);
    } else {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((card, i) =>
            i === firstIndex || i === secondIndex ? { ...card, flipped: false } : card
          )
        );
        setFlippedCards([]);
      }, 800);
    }
  }

  function resetGame() {
    const reshuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    setCards(reshuffled.map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false })));
    setFlippedCards([]);
    setMatchedPairs(0);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Memory Match Game</h1>
      <p className="text-lg mb-4">Match all pairs to win! 🔥</p>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={`w-16 h-16 flex items-center justify-center text-2xl bg-gray-700 rounded-lg cursor-pointer ${
              card.matched ? "opacity-50" : "hover:bg-gray-600"
            }`}
            onClick={() => handleCardClick(index)}
            animate={{ rotateY: card.flipped ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {card.flipped || card.matched ? card.emoji : "❓"}
          </motion.div>
        ))}
      </div>
      {matchedPairs === emojis.length && (
        <div className="mt-6">
          <p className="text-xl font-bold text-green-400">🎉 You Matched All Pairs! 🎉</p>
          <button onClick={resetGame} className="mt-4 bg-red-500 px-6 py-2 rounded-lg hover:bg-red-400 transition">
            Restart Game 🔄
          </button>
        </div>
      )}
    </div>
  );
}
