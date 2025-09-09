// Single hash map acting as dictionary for names and words
export const gameDictionary = {
  "VERTHAK": "REINA",
  "DAARDENDRIEN": "ROJA",
  "MORN": "DESPERTAR",
  "VAERIX": "ACERCA",
  "KOTHAR": "PRONTO",
  "THURIR": "RITUALES",
  "ARKAN": "CONTINUAR",
  "VELKYN": "SOMBRA",
  "DRAKE": "FIELES",
  "JHAL": "ESPERAN",
  "KORTHANE": "SEÑAL",
  "GETHICATH": "MALDICIÓN",
  "KORTH": "VELO",
  "VAERGAUN": "CARMESÍ"
};

// Persistent data structure to track failed attempts for each word
const getAttemptTracker = () => {
  const stored = localStorage.getItem('wordAttemptTracker');
  return stored ? JSON.parse(stored) : {};
};

const saveAttemptTracker = (tracker) => {
  localStorage.setItem('wordAttemptTracker', JSON.stringify(tracker));
};

// Persistent data structure to track word completion status
const getWordStatusTracker = () => {
  const stored = localStorage.getItem('wordStatusTracker');
  return stored ? JSON.parse(stored) : {};
};

const saveWordStatusTracker = (tracker) => {
  localStorage.setItem('wordStatusTracker', JSON.stringify(tracker));
};

// Persistent data structure to track all attempted words
const getAttemptedWordsTracker = () => {
  const stored = localStorage.getItem('attemptedWordsTracker');
  return stored ? JSON.parse(stored) : {};
};

const saveAttemptedWordsTracker = (tracker) => {
  localStorage.setItem('attemptedWordsTracker', JSON.stringify(tracker));
};

// Function to check if a word has reached max attempts (3)
export const hasReachedMaxAttempts = (word) => {
  const tracker = getAttemptTracker();
  const attempts = tracker[word] || 0;
  return attempts >= 3;
};

// Function to increment failed attempts for a word
export const incrementFailedAttempts = (word) => {
  const tracker = getAttemptTracker();
  tracker[word] = (tracker[word] || 0) + 1;
  saveAttemptTracker(tracker);
};

// Function to get current attempt count for a word
export const getAttemptCount = (word) => {
  const tracker = getAttemptTracker();
  return tracker[word] || 0;
};

// Function to reset attempt tracker (for admin/debugging)
export const resetAttemptTracker = () => {
  localStorage.removeItem('wordAttemptTracker');
};

// Function to mark a word as successfully completed
export const markWordAsCompleted = (word) => {
  const tracker = getWordStatusTracker();
  tracker[word] = 'completed';
  saveWordStatusTracker(tracker);
};

// Function to mark a word as failed
export const markWordAsFailed = (word) => {
  const tracker = getWordStatusTracker();
  tracker[word] = 'failed';
  saveWordStatusTracker(tracker);
};

// Function to check if a word has been completed (success)
export const isWordCompleted = (word) => {
  const tracker = getWordStatusTracker();
  return tracker[word] === 'completed';
};

// Function to check if a word has been failed
export const isWordFailed = (word) => {
  const tracker = getWordStatusTracker();
  return tracker[word] === 'failed';
};

// Function to get word status
export const getWordStatus = (word) => {
  const tracker = getWordStatusTracker();
  return tracker[word] || 'available';
};

// Function to reset word status tracker (for admin/debugging)
export const resetWordStatusTracker = () => {
  localStorage.removeItem('wordStatusTracker');
};

// Function to get all word statuses (for debugging)
export const getAllWordStatuses = () => {
  return getWordStatusTracker();
};

// Function to mark a word as attempted
export const markWordAsAttempted = (word) => {
  const tracker = getAttemptedWordsTracker();
  tracker[word] = true;
  saveAttemptedWordsTracker(tracker);
};

// Function to check if a word has been attempted
export const isWordAttempted = (word) => {
  const tracker = getAttemptedWordsTracker();
  return tracker[word] === true;
};

// Function to get all attempted words (for debugging)
export const getAllAttemptedWords = () => {
  const tracker = getAttemptedWordsTracker();
  return Object.keys(tracker).filter(word => tracker[word] === true);
};

// Function to reset attempted words tracker (for admin/debugging)
export const resetAttemptedWordsTracker = () => {
  localStorage.removeItem('attemptedWordsTracker');
};

// Function to get all tracking data (for debugging)
export const getAllTrackingData = () => {
  return {
    attemptedWords: getAllAttemptedWords(),
    wordStatuses: getAllWordStatuses(),
    attemptCounts: getAttemptTracker()
  };
};

// Function to reset all tracking data (for admin/debugging)
export const resetAllTrackingData = () => {
  resetAttemptTracker();
  resetWordStatusTracker();
  resetAttemptedWordsTracker();
};

// Function to assign a word to a player based on name
export const assignWordToPlayer = (playerName) => {
  const normalizedName = playerName.trim();
  
  // Find the key that matches (case-insensitive)
  const matchingKey = Object.keys(gameDictionary).find(key => 
    key.toLowerCase() === normalizedName.toLowerCase()
  );
  
  if (!matchingKey) {
    return null; // Name not found
  }
  
  const word = gameDictionary[matchingKey];
  
  // Check if word has been attempted before
  if (isWordAttempted(word)) {
    throw new Error(`"${matchingKey}" has already been attempted and cannot be tried again.`);
  }
  
  // Check if word has been failed
  if (isWordFailed(word)) {
    throw new Error(`"${matchingKey}" has already been failed and cannot be attempted again.`);
  }
  
  // Check if word has been completed
  if (isWordCompleted(word)) {
    throw new Error(`"${matchingKey}" has already been completed successfully.`);
  }
  
  if (hasReachedMaxAttempts(word)) {
    return null; // Word has reached max attempts
  }
  
  return word;
};

// Function to check if a name exists in the dictionary
export const validateName = (name) => {
  const normalizedName = name.trim();
  return Object.keys(gameDictionary).some(key => 
    key.toLowerCase() === normalizedName.toLowerCase()
  );
};

// Function to remove a used name from the dictionary
export const removeName = (name) => {
  const normalizedName = name.trim();
  const matchingKey = Object.keys(gameDictionary).find(key => 
    key.toLowerCase() === normalizedName.toLowerCase()
  );
  
  if (matchingKey) {
    delete gameDictionary[matchingKey];
    return true;
  }
  return false;
};

// Function to get remaining names count
export const getRemainingNamesCount = () => Object.keys(gameDictionary).length;

// Function to get all remaining names (for debugging/admin purposes)
export const getRemainingNames = () => Object.keys(gameDictionary);

// Function to get all available words (for reference)
export const getAllWords = () => Object.values(gameDictionary);

// Function to check if a word exists in our dictionary values
export const isValidWord = (word) => {
  return Object.values(gameDictionary).includes(word.toUpperCase());
};
