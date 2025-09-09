// Core Wordle game logic for the Draconic Wordle game

// Evaluate a guess against the target word and return counts
export const evaluateGuess = (guess, targetWord) => {
  const targetArray = targetWord.split('');
  const guessArray = guess.split('');
  
  let correctInPlace = 0;
  let correctWrongPosition = 0;
  
  // Create a copy of target array to mark used letters
  const remainingTarget = [...targetArray];
  const usedPositions = new Set();
  
  // First pass: find exact matches (correct in place)
  for (let i = 0; i < guessArray.length; i++) {
    if (guessArray[i] === targetArray[i]) {
      correctInPlace++;
      remainingTarget[i] = null; // Mark as used
      usedPositions.add(i);
    }
  }
  
  // Second pass: find partial matches (correct but wrong position)
  for (let i = 0; i < guessArray.length; i++) {
    if (usedPositions.has(i)) continue; // Skip already processed letters
    
    const letter = guessArray[i];
    const targetIndex = remainingTarget.findIndex(l => l === letter);
    
    if (targetIndex !== -1) {
      correctWrongPosition++;
      remainingTarget[targetIndex] = null; // Mark as used
    }
  }
  
  return {
    correctInPlace,
    correctWrongPosition,
    guess: guess.toUpperCase()
  };
};

// Calculate max attempts based on word length
export const calculateMaxAttempts = (wordLength) => {
  return Math.max(4, Math.ceil(wordLength * 1.3));
};

// Check if the game is won
export const isGameWon = (guess, targetWord) => {
  return guess.toUpperCase() === targetWord.toUpperCase();
};

// Check if the game is over (dynamic attempts based on word length)
export const isGameOver = (attempts, wordLength) => {
  const maxAttempts = calculateMaxAttempts(wordLength);
  return attempts >= maxAttempts;
};

// Validate input (must match target word length, alphabetic only)
export const validateInput = (input, targetWord) => {
  if (input.length !== targetWord.length) return false;
  return /^[A-Za-z]+$/.test(input);
};

// Format input to uppercase
export const formatInput = (input) => {
  return input.toUpperCase();
};

// Calculate game statistics
export const calculateStats = (attempts, won, targetWord) => {
  const maxAttempts = calculateMaxAttempts(targetWord.length);
  return {
    attempts,
    won,
    targetWord,
    timestamp: new Date().toISOString(),
    score: won ? (maxAttempts + 1 - attempts) : 0 // Dynamic scoring based on word length
  };
};
