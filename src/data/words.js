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
  "KORTHANE": "SEÑAL"
};

// Persistent data structure to track failed attempts for each word
const getAttemptTracker = () => {
  const stored = localStorage.getItem('wordAttemptTracker');
  return stored ? JSON.parse(stored) : {};
};

const saveAttemptTracker = (tracker) => {
  localStorage.setItem('wordAttemptTracker', JSON.stringify(tracker));
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
