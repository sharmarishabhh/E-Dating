// src/swipe_card/matchingService.js
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Ensure correct Firebase imports

/**
 * Calculate a match score between the current user and a potential match.
 * @param {Object} currentUser - The current user's data.
 * @param {Object} potentialMatch - The potential match's data.
 * @returns {number} - The calculated match score.
 */
const calculateMatchScore = (currentUser, potentialMatch) => {
  let score = 0;

  // 1. Check if gender matches the user's preference
  if (potentialMatch.profile.gender === currentUser.profile.lookingFor) {
    score += 1;
  }

  // 2. Check if location matches (optional)
  if (potentialMatch.profile.location === currentUser.profile.location) {
    score += 1;
  }

  // 3. Count shared interests
  const sharedInterests = potentialMatch.profile.interests.filter((interest) =>
    currentUser.profile.interests.includes(interest)
  );
  score += sharedInterests.length;

  return score;
};

/**
 * Fetch potential matches for the current user from Firestore.
 * @returns {Array} - Array of potential matches sorted by match score.
 */
export const fetchMatches = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  try {
    // Get the current user's profile from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      console.error('User profile not found.');
      return [];
    }

    const currentUser = userDoc.data();

    // Query all other users except the current user
    const q = query(collection(db, 'users'), where('uid', '!=', user.uid));
    const querySnapshot = await getDocs(q);

    // Calculate match scores for each potential match
    const matches = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      score: calculateMatchScore(currentUser, doc.data()),
    }));

    // Sort matches by descending match score
    return matches.sort((a, b) => b.score - a.score);
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
};
