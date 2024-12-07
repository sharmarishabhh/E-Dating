// src/swipe_card/SwipeCards.js
import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable'; // Import swipeable hook
import { fetchMatches } from './matchingservice'; // Your matching logic
import './Swipecard.css'; // Import CSS for styling

const SwipeCards = () => {
  const [matches, setMatches] = useState([]);
  const [index, setIndex] = useState(0); // Track the current card index

  // Fetch potential matches on mount
  useEffect(() => {
    const getMatches = async () => {
      const fetchedMatches = await fetchMatches();
      setMatches(fetchedMatches);
    };
    getMatches();
  }, []);

  // Swipe handlers using react-swipeable
  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    preventScrollOnSwipe: true,
  });

  // Handle swipe logic
  const handleSwipe = (direction) => {
    console.log(`You swiped ${direction} on ${matches[index]?.id}`);
    if (index < matches.length - 1) setIndex((prev) => prev + 1);
  };

  return (
    <div className="swipe-container" {...handlers}>
      <h1>Swipe to Match!</h1>
      {matches[index] ? (
        <div
          className="card"
          style={{
            backgroundImage: `url(${matches[index].profilePicture || 'default.jpg'})`,
          }}
        >
          <h2>{matches[index].profile.name}</h2>
        </div>
      ) : (
        <p>No more matches available.</p>
      )}
    </div>
  );
};

export default SwipeCards;
