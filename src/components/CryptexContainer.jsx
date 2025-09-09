import React, { useState, useEffect } from 'react';
import CryptexSegment from './CryptexSegment';

const CryptexContainer = ({ 
  wordLength, 
  onWordComplete, 
  targetWord,
  onSubmit,
  lastGuessFeedback
}) => {
  const [segmentStates, setSegmentStates] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  // Initialize segments based on word length
  useEffect(() => {
    const initialStates = Array(wordLength).fill(0).map((_, index) => ({
      position: index,
      rotation: 0,
      letter: 'A'
    }));
    setSegmentStates(initialStates);
  }, [wordLength]);

  // Update current word when segments change
  useEffect(() => {
    const word = segmentStates.map(segment => segment.letter).join('');
    setCurrentWord(word);
    onWordComplete(word);
  }, [segmentStates, onWordComplete]);

  // Show feedback when there's a new guess with no correct letters
  useEffect(() => {
    if (lastGuessFeedback && 
        lastGuessFeedback.correctInPlace === 0 && 
        lastGuessFeedback.correctWrongPosition === 0) {
      setShowFeedback(true);
      
      // Hide feedback after 2 seconds
      const timer = setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [lastGuessFeedback]);

  const handleSegmentRotate = (position, rotation, letter) => {
    setSegmentStates(prev => prev.map(segment => 
      segment.position === position 
        ? { ...segment, rotation, letter: letter || getLetterFromRotation(rotation) }
        : segment
    ));
  };

  const getLetterFromRotation = (rot) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const index = Math.floor((rot % 360) / 36) % 26;
    return letters[index];
  };

  const canSubmit = currentWord.length === wordLength;

  // Calculate feedback for each segment
  const getSegmentFeedback = (position) => {
    if (!showFeedback) return null;
    
    // If there are no correct letters at all, show red X for all segments
    if (lastGuessFeedback && 
        lastGuessFeedback.correctInPlace === 0 && 
        lastGuessFeedback.correctWrongPosition === 0) {
      return 'incorrect';
    }
    
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit && onSubmit) {
      onSubmit(currentWord);
    }
  };

  return (
    <div className="cryptex-container">
      <div className="cryptex-cylinder">
        {segmentStates.map((segment, index) => (
          <CryptexSegment
            key={index}
            position={segment.position}
            currentLetter={segment.letter}
            onRotate={handleSegmentRotate}
            isActive={true}
            feedback={getSegmentFeedback(index)}
          />
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 mt-8">
        <div className="current-word-display">
          {currentWord}
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
  );
};

export default CryptexContainer;
