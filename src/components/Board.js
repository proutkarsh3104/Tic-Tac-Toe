
import React, { useState, useEffect } from 'react';

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: line };
    }
  }
  return null;
};

const minimax = (squares, depth, isMax, alpha, beta) => {
  const result = calculateWinner(squares);
  const winner = result?.winner;
  
  if (winner === 'X') return -10 + depth;
  if (winner === 'O') return 10 - depth;
  if (squares.every(square => square)) return 0;
  
  if (isMax) {
    let best = -1000;
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        squares[i] = 'O';
        best = Math.max(best, minimax(squares, depth + 1, !isMax, alpha, beta));
        squares[i] = null;
        alpha = Math.max(alpha, best);
        if (beta <= alpha) break;
      }
    }
    return best;
  } else {
    let best = 1000;
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        squares[i] = 'X';
        best = Math.min(best, minimax(squares, depth + 1, !isMax, alpha, beta));
        squares[i] = null;
        beta = Math.min(beta, best);
        if (beta <= alpha) break;
      }
    }
    return best;
  }
};

const findBestMove = (squares) => {
  let bestVal = -1000;
  let bestMove = -1;
  
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      squares[i] = 'O';
      let moveVal = minimax(squares, 0, false, -1000, 1000);
      squares[i] = null;
      
      if (moveVal > bestVal) {
        bestMove = i;
        bestVal = moveVal;
      }
    }
  }
  return bestMove;
};

const Square = ({ value, onClick, isWinningSquare, isLatestMove, disabled }) => (
  <button 
    className={`w-24 h-24 border-2 text-5xl font-bold 
    ${isWinningSquare ? 'bg-green-200 border-green-400' : 'bg-white border-purple-300'} 
    hover:bg-purple-50 transition-all duration-300 transform 
    ${isLatestMove ? 'scale-100' : 'scale-95'} 
    hover:scale-105 rounded-xl shadow-lg
    ${value === 'X' ? 'text-blue-500' : 'text-red-500'}
    ${disabled ? 'cursor-not-allowed opacity-80' : 'hover:bg-purple-100'}
    backdrop-blur-sm bg-opacity-90`}
    onClick={onClick}
    disabled={disabled}
  >
    <span className={`inline-block transition-transform duration-300 
      ${isLatestMove ? 'animate-bounce' : ''}`}>
      {value}
    </span>
  </button>
);

const StatusMessage = ({ status, isGameOver }) => (
  <div className={`text-2xl font-bold mb-6 transition-all duration-500 transform 
    ${isGameOver ? 'scale-110 text-green-500' : 'text-purple-700'}
    bg-white bg-opacity-80 px-6 py-3 rounded-full shadow-md`}>
    {status}
  </div>
);

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isNextX, setIsNextX] = useState(true);
  const [latestMove, setLatestMove] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState({ player: 0, ai: 0, draws: 0 });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = async (i) => {
    if (calculateWinner(squares)?.winner || squares[i] || isProcessing) return;
    
    setIsProcessing(true);
    const newSquares = squares.slice();
    newSquares[i] = 'X';
    setSquares(newSquares);
    setIsNextX(false);
    setLatestMove(i);
    setGameStarted(true);
    
    // AI move
    await new Promise(resolve => setTimeout(resolve, 500));
    const bestMove = findBestMove(newSquares);
    if (bestMove !== -1) {
      newSquares[bestMove] = 'O';
      setSquares(newSquares);
      setIsNextX(true);
      setLatestMove(bestMove);
    }
    setIsProcessing(false);
  };
  
  const result = calculateWinner(squares);
  const winner = result?.winner;
  const winningLine = result?.line || [];
  const isDraw = !winner && squares.every(square => square);
  
  useEffect(() => {
    if (winner === 'X') setScore(prev => ({ ...prev, player: prev.player + 1 }));
    if (winner === 'O') setScore(prev => ({ ...prev, ai: prev.ai + 1 }));
    if (isDraw) setScore(prev => ({ ...prev, draws: prev.draws + 1 }));
  }, [winner, isDraw]);

  const status = winner 
    ? `Winner: ${winner}`
    : isDraw
    ? "Game Draw!"
    : gameStarted
    ? `Next player: ${isNextX ? 'X' : 'O'}`
    : "Start game by placing X";
    
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsNextX(true);
    setLatestMove(null);
    setGameStarted(false);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-6 p-8 bg-white bg-opacity-40 backdrop-blur-lg rounded-2xl shadow-2xl 
        transform hover:shadow-3xl transition-all duration-300 border border-white border-opacity-20">
        <h1 className="text-5xl font-bold text-white mb-2 text-shadow">Tic Tac Toe vs AI</h1>
        
        <div className="flex gap-12 mb-4">
          <div className="text-center bg-white bg-opacity-80 p-4 rounded-xl shadow-lg">
            <div className="text-lg font-semibold text-blue-600">Player (X)</div>
            <div className="text-3xl font-bold">{score.player}</div>
          </div>
          <div className="text-center bg-white bg-opacity-80 p-4 rounded-xl shadow-lg">
            <div className="text-lg font-semibold text-gray-600">Draws</div>
            <div className="text-3xl font-bold">{score.draws}</div>
          </div>
          <div className="text-center bg-white bg-opacity-80 p-4 rounded-xl shadow-lg">
            <div className="text-lg font-semibold text-red-600">AI (O)</div>
            <div className="text-3xl font-bold">{score.ai}</div>
          </div>
        </div>

        <StatusMessage status={status} isGameOver={winner || isDraw} />
        
        <div className="grid grid-cols-3 gap-3 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded-xl">
          {squares.map((square, i) => (
            <Square
              key={i}
              value={square}
              onClick={() => handleClick(i)}
              isWinningSquare={winningLine.includes(i)}
              isLatestMove={latestMove === i}
              disabled={isProcessing || Boolean(square) || Boolean(winner)}
            />
          ))}
        </div>

        <button 
          className="mt-6 px-8 py-4 bg-purple-600 text-white rounded-xl 
            hover:bg-purple-700 transform hover:scale-105 transition-all duration-300
            font-semibold shadow-lg hover:shadow-xl disabled:opacity-50
            disabled:cursor-not-allowed"
          onClick={resetGame}
          disabled={isProcessing}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default Board;