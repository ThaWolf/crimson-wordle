import React, { useState, useEffect, useRef } from 'react';

const CryptexSegment = ({ 
  position, 
  currentLetter, 
  onRotate, 
  isActive = false,
  feedback = null 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const segmentRef = useRef(null);

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // Initialize current index based on current letter
  useEffect(() => {
    const letterIndex = letters.indexOf(currentLetter);
    setCurrentIndex(letterIndex);
  }, [currentLetter]);

  const handleClick = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Move to next letter
    const newIndex = (currentIndex + 1) % 26;
    const newLetter = letters[newIndex];
    
    setCurrentIndex(newIndex);
    onRotate(position, 0, newLetter); // No rotation value needed
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 200);
  };

  // Add wheel event listener with proper options
  useEffect(() => {
    const element = segmentRef.current;
    if (!element) return;

    const wheelHandler = (e) => {
      if (isAnimating) return;
      e.preventDefault();
      
      const delta = e.deltaY > 0 ? 1 : -1;
      const newIndex = ((currentIndex + delta) % 26 + 26) % 26;
      const newLetter = letters[newIndex];
      
      setIsAnimating(true);
      setCurrentIndex(newIndex);
      onRotate(position, 0, newLetter);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 200);
    };

    element.addEventListener('wheel', wheelHandler, { passive: false });
    
    return () => {
      element.removeEventListener('wheel', wheelHandler);
    };
  }, [isAnimating, currentIndex, onRotate, position]);

  // Create array of letters to display (with wraparound)
  const getVisibleLetters = () => {
    const visibleLetters = [];
    
    for (let i = -2; i <= 2; i++) {
      const index = ((currentIndex + i) % 26 + 26) % 26;
      visibleLetters.push({
        letter: letters[index],
        isCenter: i === 0
      });
    }
    
    return visibleLetters;
  };

  const visibleLetters = getVisibleLetters();

  return (
    <div 
      ref={segmentRef}
      className={`
        cryptex-segment-wheel 
        ${isActive ? 'active' : ''} 
        ${isAnimating ? 'animating' : ''}
        ${feedback ? `feedback-${feedback}` : ''}
      `}
      onClick={handleClick}
    >
      <div className="letter-wheel">
        {visibleLetters.map((item, index) => (
          <div
            key={`${item.letter}-${index}-${currentIndex}`}
            className={`letter-slot ${item.isCenter ? 'center' : ''}`}
            style={{
              opacity: item.isCenter ? 1 : 0.6,
              fontSize: item.isCenter ? '24px' : '18px',
              fontWeight: item.isCenter ? 'bold' : 'normal',
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `translate(-50%, -50%) translateY(${index * 40 - 80}px)`,
              transition: isAnimating ? 'opacity 0.2s ease' : 'none'
            }}
          >
            {item.letter}
          </div>
        ))}
      </div>
      
      {/* Red X feedback overlay */}
      {feedback === 'incorrect' && (
        <div className="feedback-overlay">
          <div className="red-x">✕</div>
        </div>
      )}
    </div>
  );
};

export default CryptexSegment;
