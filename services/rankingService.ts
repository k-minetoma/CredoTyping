import { ScoreEntry } from '../types';

const RANKING_KEY = 'kredo-bakutan-ranking';
const MAX_ENTRIES = 100;

/**
 * Reads the rankings from localStorage.
 * This function is defensive and ensures a valid, clean array of scores is always returned.
 * It automatically filters out any malformed or invalid entries.
 * @returns {ScoreEntry[]} A sorted array of score entries.
 */
export const getRankings = (): ScoreEntry[] => {
  const rawData = localStorage.getItem(RANKING_KEY);
  if (!rawData) {
    return [];
  }

  try {
    const parsedData = JSON.parse(rawData);

    // Ensure the data is an array. If not, it's invalid.
    if (!Array.isArray(parsedData)) {
      console.error("Ranking data is not an array. Clearing storage.");
      localStorage.removeItem(RANKING_KEY);
      return [];
    }
    
    // Filter out any entries that don't match the ScoreEntry shape.
    // This cleans up malformed data (e.g., from older versions or corruption).
    const validRankings = parsedData.filter(
      (entry): entry is ScoreEntry =>
        entry &&
        typeof entry.name === 'string' &&
        typeof entry.score === 'number' &&
        isFinite(entry.score) // Ensures score is a finite number (not NaN, Infinity)
    );
    
    return validRankings;

  } catch (error) {
    // If JSON parsing fails, the data is corrupt. Clear it.
    console.error("Error parsing ranking data, clearing storage.", error);
    localStorage.removeItem(RANKING_KEY);
    return [];
  }
};

/**
 * Adds a new score to the rankings.
 * It reads the current rankings, adds the new score, sorts the list,
 * trims it to the max entries, and saves it back to localStorage.
 * @param {string} name - The player's nickname.
 * @param {number} score - The player's final score.
 */
export const addRanking = (name: string, score: number): void => {
  // 1. Validate the input to prevent adding invalid data.
  if (!name || typeof name !== 'string' || typeof score !== 'number' || !isFinite(score)) {
      console.error("Invalid input provided to addRanking:", { name, score });
      return;
  }

  try {
    // 2. Get the current clean list of rankings.
    const currentRankings = getRankings();
    
    // 3. Create and add the new entry.
    const newEntry: ScoreEntry = { name: name.slice(0, 12), score };
    const updatedRankings = [...currentRankings, newEntry];
    
    // 4. Sort the combined list by score in descending order.
    updatedRankings.sort((a, b) => b.score - a.score);
    
    // 5. Trim the list to the maximum allowed number of entries.
    const finalRankings = updatedRankings.slice(0, MAX_ENTRIES);

    // 6. Save the final, sorted, and trimmed list back to storage.
    localStorage.setItem(RANKING_KEY, JSON.stringify(finalRankings));

  } catch (error) {
    // This might happen if localStorage is full or quotas are exceeded.
    console.error("Failed to save new ranking to localStorage:", error);
  }
};
