import { useState, useEffect } from 'react';
import { validateName, removeName, assignWordToPlayer, incrementFailedAttempts } from '../data/words';
import { evaluateGuess, isGameWon, isGameOver, validateInput, formatInput, calculateStats } from '../utils/gameLogic';

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
      setErrorMessage('Character name not found in campaign roster.');
      return false;
    }

    const word = assignWordToPlayer(name);
    if (!word) {
      setErrorMessage('Unable to assign word to character. Please try again.');
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
    
    return true;
  };

  // Submit a guess
  const submitGuess = () => {
    if (!validateInput(currentGuess, targetWord)) {
      setErrorMessage(`Please enter exactly ${targetWord.length} letters.`);
      return;
    }

    const formattedGuess = formatInput(currentGuess);
    const evaluation = evaluateGuess(formattedGuess, targetWord);
    const won = isGameWon(formattedGuess, targetWord);
    const newAttempts = attempts + 1;
    const over = isGameOver(newAttempts);

    const newGuesses = [...guesses, evaluation];
    
    setGuesses(newGuesses);
    setAttempts(newAttempts);
    setCurrentGuess(''); // Clear input immediately
    setGameWon(won);
    setErrorMessage('');

    if (won || over) {
      // If game is lost, increment failed attempts for the word
      if (!won) {
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
      
      // If won, show results page
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
    
    // Computed values
    isGameOver: isGameOver(attempts),
    canSubmit
  };
};
