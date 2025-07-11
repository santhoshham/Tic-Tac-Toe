import React, { useState } from "react";
import Square from "./Square";
import "./Board.css";

export default function Board() {
  // Step 1: Initial state (empty board and "X" starts)
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  // Step 2: Determine winner or next player
  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : squares.includes(null)
    ? `Next player: ${isXNext ? "X" : "O"}`
    : "Draw!";

  // Step 3: When a square is clicked
  function handleClick(index) {
    // Ignore if square is already filled or game is over
    if (squares[index] || winner) return;

    // Create a copy of squares and update it
    const nextSquares = [...squares];
    nextSquares[index] = isXNext ? "X" : "O";
    setSquares(nextSquares);

    // Switch turn to the next player
    setIsXNext(!isXNext);
  }

  // Step 4: When "New Game" button is clicked
  function handleNewGame() {
    setSquares(Array(9).fill(null)); // reset board
    setIsXNext(true); // reset turn
  }

  // Step 5: Render board + status + button
  return (
    <div className="board-container">
      <div className="status">{status}</div>

      <div className="board">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>

      <button className="new-game-btn" onClick={handleNewGame}>
        New Game
      </button>
    </div>
  );
}

// Step 6: Check for winner
function calculateWinner(sq) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],            // diagonals
  ];
  for (let [a, b, c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a];
  }
  return null;
}
