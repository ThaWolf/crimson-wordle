import { useState, useEffect } from 'react';
import { validateName, removeName, assignWordToPlayer, incrementFailedAttempts, markWordAsCompleted, markWordAsFailed, markWordAsAttempted } from '../data/words';
import { evaluateGuess, isGameWon, isGameOver, validateInput, formatInput, calculateStats, calculateMaxAttempts } from '../utils/gameLogic';

export const useGameState = () => {
  const [gameState, setGameState] = useState('landing'); // 'landing', 'playing', 'results'
  const [playerName, setPlayerName] = useState('');
  const [targetWord, setTargetWord] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameStats, setGameStats] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize game for a player
  const startGame = (name) => {
    if (!validateName(name)) {
      setErrorMessage('Word was not recognized.');
      return false;
    }

    try {
      const word = assignWordToPlayer(name);
      if (!word) {
        setErrorMessage('Unable to assign word. Please try again.');
        return false;
      }

      setPlayerName(name);
      setTargetWord(word);
      setGameState('playing');
      setCurrentGuess('');
      setGuesses([]);
      setAttempts(0);
      setGameWon(false);
      setGameStats(null);
      setErrorMessage('');
      
      // Mark word as attempted
      markWordAsAttempted(word);
      
      return true;
    } catch (error) {
      setErrorMessage(error.message);
      return false;
    }
  };

  // Submit a guess
  const submitGuess = (word = null) => {
    const guessToUse = word || currentGuess;
    
    if (!validateInput(guessToUse, targetWord)) {
      setErrorMessage(`Please enter exactly ${targetWord.length} letters.`);
      return;
    }

    const formattedGuess = formatInput(guessToUse);
    const evaluation = evaluateGuess(formattedGuess, targetWord);
    const won = isGameWon(formattedGuess, targetWord);
    const newAttempts = attempts + 1;
    const over = isGameOver(newAttempts, targetWord.length);

    const newGuesses = [...guesses, evaluation];
    
    setGuesses(newGuesses);
    setAttempts(newAttempts);
    setCurrentGuess(''); // Clear input immediately
    setGameWon(won);
    setErrorMessage('');

    if (won || over) {
      // If game is lost, mark word as failed and increment failed attempts
      if (!won) {
        markWordAsFailed(targetWord);
        incrementFailedAttempts(targetWord);
        // On failure, go directly back to landing without showing results
        setGameState('landing');
        setPlayerName('');
        setTargetWord('');
        setCurrentGuess('');
        setGuesses([]);
        setAttempts(0);
        setGameWon(false);
        setGameStats(null);
        setErrorMessage('');
        return;
      }
      
      // If won, mark word as completed and show results page
      markWordAsCompleted(targetWord);
      const stats = calculateStats(newAttempts, won, targetWord);
      setGameStats(stats);
      setGameState('results');
      
      // Remove player name from available roster
      removeName(playerName);
    }
  };

  // Handle Enter key press for form submission
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && gameState === 'playing' && canSubmit) {
      e.preventDefault();
      submitGuess();
    }
  };

  // Clear error message
  const clearError = () => {
    setErrorMessage('');
  };

  // Reset game and return to landing
  const resetGame = () => {
    setGameState('landing');
    setPlayerName('');
    setTargetWord('');
    setCurrentGuess('');
    setGuesses([]);
    setAttempts(0);
    setGameWon(false);
    setGameStats(null);
    setErrorMessage('');
  };

  // Computed values
  const canSubmit = currentGuess.length === targetWord.length && gameState === 'playing';
  const maxAttempts = targetWord ? calculateMaxAttempts(targetWord.length) : 6;

  return {
    // State
    gameState,
    playerName,
    targetWord,
    currentGuess,
    guesses,
    attempts,
    gameWon,
    gameStats,
    errorMessage,
    
    // Actions
    startGame,
    submitGuess,
    handleKeyPress,
    resetGame,
    setCurrentGuess,
    clearError,
    
    // Computed values
    maxAttempts,
    isGameOver: isGameOver(attempts, targetWord.length),
    canSubmit
  };
};
