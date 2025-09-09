import React, { useState } from 'react'
import './index.css'
import { useGameState } from './hooks/useGameState'
import GameBoard from './components/GameBoard'
import ResultsDisplay from './components/ResultsDisplay'
import TextGamePage from './pages/TextGamePage'
import CryptexGamePage from './pages/CryptexGamePage'

function App() {
  const [inputMethod, setInputMethod] = useState('cryptex'); // Default to cryptex
  
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
    handleKeyPress,
    maxAttempts,
    clearError
  } = useGameState()

  const [playerNameInput, setPlayerNameInput] = useState('');

  const handleNameInput = (e) => {
    const name = e.target.value.trim()
    
    // Clear error message when user starts typing
    if (errorMessage) {
      clearError()
    }
    
    if (name && e.key === 'Enter') {
      setPlayerNameInput(name)
      startGame(name) // Directly start game with cryptex
    }
  }

  const handleGuessSubmit = (e) => {
    e.preventDefault()
    if (canSubmit) {
      submitGuess()
    }
  }

  const toggleInputMethod = () => {
    setInputMethod(inputMethod === 'cryptex' ? 'text' : 'cryptex')
  }


  // Landing Page - Ultra Minimalist
  if (gameState === 'landing') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          {errorMessage && (
            <div 
              className="bg-red-900/80 border border-red-600 text-red-100 px-4 py-3 rounded-lg text-center max-w-md cursor-pointer hover:bg-red-800/80 transition-colors"
              onClick={clearError}
              title="Click to dismiss"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>⚠️</span>
                <span>{errorMessage}</span>
              </span>
            </div>
          )}
          <input
            type="text"
            className="minimal-input"
            placeholder="Enter Word"
            onKeyPress={handleNameInput}
            autoFocus
          />
        </div>
      </div>
    )
  }

  // Game Page - Route to appropriate input method
  if (gameState === 'playing') {
    const gameProps = {
      gameState,
      playerName,
      targetWord,
      currentGuess,
      guesses,
      attempts,
      gameWon,
      gameStats,
      errorMessage,
      submitGuess,
      resetGame,
      setCurrentGuess,
      canSubmit,
      handleKeyPress,
      maxAttempts,
      inputMethod,
      toggleInputMethod
    };

    return inputMethod === 'text' ? 
      <TextGamePage {...gameProps} /> : 
      <CryptexGamePage {...gameProps} />;
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
