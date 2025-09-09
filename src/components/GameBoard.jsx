import React from 'react';

const GameBoard = ({ guesses, currentGuess, attempts, targetWord, maxAttempts }) => {
  const wordLength = targetWord.length;

  // Create empty rows for remaining attempts
  const emptyRows = Array(maxAttempts - attempts).fill(null);

  // Create visual feedback symbols
  const createFeedbackSymbols = (evaluation) => {
    const { correctInPlace, correctWrongPosition } = evaluation;
    const symbols = [];
    
    // Add green triangles for correct in place
    for (let i = 0; i < correctInPlace; i++) {
      symbols.push(
        <span key={`correct-${i}`} style={{ color: '#10B981' }} className="text-2xl mx-1">
          ▲
        </span>
      );
    }
    
    // Add upside-down yellow triangles for correct wrong position
    for (let i = 0; i < correctWrongPosition; i++) {
      symbols.push(
        <span key={`wrong-${i}`} style={{ color: '#F59E0B' }} className="text-2xl mx-1">
          ▼
        </span>
      );
    }
    
    return symbols;
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Image Container - At the very top */}
      <div className="w-full bg-red-600 rounded-lg p-2">
        <div className="flex justify-center">
          <img 
            src="/src/assets/img/title.png"
            alt="Game Title"
            className="max-w-full h-auto max-h-24 object-contain"
          />
        </div>
      </div>

      {/* Submitted Guesses List - Below the form */}
      <div className="w-80 space-y-2">
        {guesses.map((evaluation, index) => {
          const remainingAttempts = maxAttempts - (index + 1);
          return (
            <div key={index} className="flex items-center space-x-3">
              <div 
                className="bg-gray-800 border-2 border-yellow-500 rounded-lg p-3 flex justify-between items-center flex-1"
              >
                <span className="text-white font-mono text-lg font-bold">
                  {evaluation.guess}
                </span>
                <div className="flex items-center">
                  {createFeedbackSymbols(evaluation)}
                </div>
              </div>
              <div className="text-red-600 remaining text-lg font-mono font-bold pl-1">
                {remainingAttempts}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameBoard;
