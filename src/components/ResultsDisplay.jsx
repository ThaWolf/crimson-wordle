import React from 'react';

const ResultsDisplay = ({ playerName, targetWord, onClose }) => {
  return (
    <div className="card max-w-md w-full text-center">
      {/* Success Icon */}
      <div className="text-6xl mb-8">
        🐉
      </div>

      {/* Input = Word Display */}
      <div className="bg-gray-800/60 rounded-lg p-6 mb-8 border border-gray-600">
        <div className="text-2xl font-mono text-white">
          <span className="text-gray-400">{playerName}</span>
          <span className="text-yellow-400 mx-3">=</span>
          <span className="text-green-400">{targetWord}</span>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="btn-primary w-full"
      >
        ♢
      </button>
    </div>
  );
};

export default ResultsDisplay;
