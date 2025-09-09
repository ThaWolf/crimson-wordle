import React from 'react';
import GameBoard from '../components/GameBoard';
import ResultsDisplay from '../components/ResultsDisplay';
import CryptexContainer from '../components/CryptexContainer';

const CryptexGamePage = ({
  gameState,
  playerName,
  targetWord,
  guesses,
  attempts,
  gameWon,
  gameStats,
  errorMessage,
  submitGuess,
  resetGame,
  maxAttempts,
  inputMethod,
  toggleInputMethod
}) => {
  const handleCryptexSubmit = (word) => {
    // Submit the word from cryptex to the game logic
    if (word.length === targetWord.length) {
      submitGuess(word);
    }
  };

  // Landing Page - Ultra Minimalist (same as current)
  if (gameState === 'landing') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <input
          type="text"
          className="minimal-input"
          placeholder="Enter Word"
          autoFocus
        />
      </div>
    );
  }

  // Game Page - Exact copy with cryptex input
  if (gameState === 'playing') {
    return (
      <div className="min-h-screen bg-black flex flex-col p-4">
        <div className="w-full max-w-2xl mx-auto relative">
          {/* Input Method Toggle - Top Right */}
          <button
            onClick={toggleInputMethod}
            className="absolute top-0 right-0 bg-gray-900/80 hover:bg-gray-800/90 text-gray-300 hover:text-white p-3 rounded-full transition-all duration-200 border border-gray-700/50 hover:border-gray-600/70 shadow-lg hover:shadow-xl"
            title="Switch to text input"
          >
            <span className="text-2xl">🪶</span>
          </button>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-900/80 border border-red-600 text-red-100 px-4 py-3 rounded-lg mb-4 text-center">
              <span className="flex items-center justify-center space-x-2">
                <span>⚠️</span>
                <span>{errorMessage}</span>
              </span>
            </div>
          )}

          {/* Game Board - Image at top, guesses list below */}
          <div className="pb-8">
            <GameBoard
              guesses={guesses}
              currentGuess=""
              attempts={attempts}
              targetWord={targetWord}
              maxAttempts={maxAttempts}
            />
          </div>

          {/* Cryptex Input - In the middle */}
          <div className="mt-20 mb-20">
            <CryptexContainer
              wordLength={targetWord.length}
              onWordComplete={() => {}}
              targetWord={targetWord}
              onSubmit={handleCryptexSubmit}
              lastGuessFeedback={guesses.length > 0 ? guesses[guesses.length - 1] : null}
            />
          </div>
        </div>
      </div>
    );
  }

  // Results Page (same as current)
  if (gameState === 'results') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="relative z-10">
          <ResultsDisplay
            playerName={playerName}
            targetWord={targetWord}
            onClose={resetGame}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default CryptexGamePage;
