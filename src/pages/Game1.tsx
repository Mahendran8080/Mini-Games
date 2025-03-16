import { useState } from "react";

export default function Game1() {
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [computerChoice, setComputerChoice] = useState<string>("");
  const [playerChoice, setPlayerChoice] = useState<string>("");
  const [result, setResult] = useState<string>("");

  function getComputerChoice(): string {
    const game: string[] = ["Rock", "Paper", "Scissors"];
    return game[Math.floor(Math.random() * game.length)];
  }

  function getResult(playerChoice: string, computerChoice: string): number {
    if (playerChoice === computerChoice) return 0;
    if (
      (playerChoice === "Rock" && computerChoice === "Scissors") ||
      (playerChoice === "Paper" && computerChoice === "Rock") ||
      (playerChoice === "Scissors" && computerChoice === "Paper")
    ) {
      return 1;
    }
    return -1;
  }

  function handleClick(choice: string): void {
    const compChoice: string = getComputerChoice();
    const score: number = getResult(choice, compChoice);
    setPlayerChoice(choice);
    setComputerChoice(compChoice);
    setPlayerScore((prevScore) => prevScore + score);
    setResult(score === 1 ? "You won!" : score === 0 ? "It's a draw" : "You lose");
  }

  function resetGame(): void {
    setPlayerScore(0);
    setPlayerChoice("");
    setComputerChoice("");
    setResult("");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="flex gap-4 mb-6">
        <button
          className="h-24 w-24 text-4xl bg-gray-700 rounded-lg hover:bg-gray-600 transition"
          onClick={() => handleClick("Rock")}
        >
          ✊
        </button>
        <button
          className="h-24 w-24 text-4xl bg-gray-700 rounded-lg hover:bg-gray-600 transition"
          onClick={() => handleClick("Paper")}
        >
          🤚
        </button>
        <button
          className="h-24 w-24 text-4xl bg-gray-700 rounded-lg hover:bg-gray-600 transition"
          onClick={() => handleClick("Scissors")}
        >
          ✌
        </button>
      </div>
      <div className="text-2xl mb-4">Score: {playerScore}</div>
      <div className="text-xl mb-2">{playerChoice && computerChoice ? `${playerChoice} vs ${computerChoice}` : ""}</div>
      <div className="text-2xl font-bold mb-4">{result}</div>
      <button
        className="h-12 w-32 bg-red-600 rounded-lg hover:bg-red-500 transition"
        onClick={resetGame}
      >
        Reset 🔴
      </button>
    </div>
  );
}
