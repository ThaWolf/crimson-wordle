import React from 'react'
import './index.css'
import { useGameState } from './hooks/useGameState'
import GameBoard from './components/GameBoard'
import ResultsDisplay from './components/ResultsDisplay'

function App() {
  const {
    gameState,
    playerName,
    targetWord,
    currentGuess,
    guesses,
    attempts,
    gameWon,
    gameStats,
    errorMessage,
    startGame,
    submitGuess,
    resetGame,
    setCurrentGuess,
    canSubmit,
    handleKeyPress
  } = useGameState()

  const handleNameInput = (e) => {
    const name = e.target.value.trim()
    if (name && e.key === 'Enter') {
      startGame(name)
    }
  }

  const handleGuessSubmit = (e) => {
    e.preventDefault()
    if (canSubmit) {
      submitGuess()
    }
  }

  // Landing Page - Ultra Minimalist
  if (gameState === 'landing') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <input
          type="text"
          className="minimal-input"
          onKeyPress={handleNameInput}
          autoFocus
        />
      </div>
    )
  }

  // Game Page
  if (gameState === 'playing') {
    return (
      <div className="min-h-screen bg-black flex flex-col p-4">
        <div className="w-full max-w-2xl mx-auto">
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
          <GameBoard
            guesses={guesses}
            currentGuess={currentGuess}
            attempts={attempts}
            targetWord={targetWord}
          />

          {/* Input Form - In the middle */}
          <div className="mt-8 mb-8">
            <form onSubmit={handleGuessSubmit} className="flex flex-col items-center space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentGuess}
                  onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
                  onKeyPress={handleKeyPress}
                  className="input-field text-center gap text-lg w-64"
                  maxLength={targetWord.length}
                  autoFocus
                />
              </div>
              
              <button
                type="submit"
                disabled={!canSubmit}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ♢
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Results Page
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
    )
  }

  return null
}

export default App
