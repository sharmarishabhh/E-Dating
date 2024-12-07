// src/Interests.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase'; // Import Firebase setup
import './Interests.css'; // Styling

const categorizedInterests = {
  Technology: [
    'Coding', 'AI', 'Robotics', 'Gadgets', 'Blockchain', 'Cybersecurity',
    'Cloud Computing', 'Web Development', 'Quantum Computing', 'Data Science',
    'Machine Learning', 'AR', 'VR', 'Networking', 'IoT', 'Game Development',
    'Automation', 'Tech Startups'
  ],
  "Film & Literature": [
    'Movies', 'Books', 'Writing', 'Poetry', 'Novels', 'Comics', 'Photography',
    'Cinematography', 'Screenwriting', 'Drama', 'Film Production'
  ],
  Sports: [
    'Football', 'Basketball', 'Swimming', 'Tennis', 'Running', 'Yoga',
    'Boxing', 'Martial Arts', 'Hiking', 'Skiing', 'Table Tennis', 'Golf'
  ],
  Music: [
    'Classical', 'Jazz', 'Rock', 'Pop', 'Hip-Hop', 'Electronic', 'R&B',
    'Metal', 'Indie', 'DJing', 'Songwriting', 'Sound Engineering'
  ],
  Travel: [
    'Backpacking', 'Road Trips', 'Luxury Travel', 'Solo Travel', 'Camping',
    'Cruises', 'City Exploration', 'Mountain Climbing', 'Trekking'
  ],
};

const Hobbiesform = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigate = useNavigate();
  const user = auth.currentUser;

  // Toggle interest selection
  const handleInterestClick = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        await setDoc(
          doc(db, 'users', user.uid),
          { interests: selectedInterests },
          { merge: true }
        );
        navigate('/habits'); // Navigate to the next form
      } catch (error) {
        console.error('Error saving interests:', error);
      }
    }
  };

  return (
    <div className="interests-page">
      <h2>Select Your Interests</h2>

      {Object.keys(categorizedInterests).map((category) => (
        <div key={category} className="category">
          <h3>{category}</h3>
          <div className="interests-grid">
            {categorizedInterests[category].map((interest) => (
              <div
                key={interest}
                className={`interest-item ${
                  selectedInterests.includes(interest) ? 'selected' : ''
                }`}
                onClick={() => handleInterestClick(interest)}
              >
                {interest}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="button-group">
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Hobbiesform;
