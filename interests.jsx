import React, { useState } from 'react';
import './Interests.css';

const categorizedInterests = {
  Technology: [
    'Coding', 'AI', 'Robotics', 'Gadgets', 'Blockchain', 'Cybersecurity', 
    'Cloud Computing', 'Web Development', 'Quantum Computing', 'Data Science',
    'Machine Learning', 'Augmented Reality', 'Virtual Reality', 'Networking',
    'IoT', 'Game Development', 'Mobile App Development', 'Digital Art', 
    'Automation', 'Tech Startups'
  ],
  "Film & Literature": [
    'Movies', 'Books', 'Writing', 'Screenwriting', 'Poetry', 'Novels',
    'Comics', 'Graphic Novels', 'Short Stories', 'Plays', 'Directing',
    'Film Production', 'Cinematography', 'Photography', 'Film Criticism',
    'Book Reviews', 'Screenplay Writing', 'Script Editing', 'Publishing',
    'Drama'
  ],
  Sports: [
    'Football', 'Basketball', 'Swimming', 'Tennis', 'Cricket', 'Cycling',
    'Running', 'Yoga', 'Boxing', 'Martial Arts', 'Hiking', 'Skiing',
    'Table Tennis', 'Golf', 'Baseball', 'Gymnastics', 'Surfing', 'Volleyball',
    'Wrestling', 'Badminton'
  ],
  Music: [
    'Classical', 'Jazz', 'Rock', 'Pop', 'Hip-Hop', 'Electronic', 'R&B',
    'Metal', 'Indie', 'Folk', 'Country', 'Opera', 'Reggae', 'Blues',
    'Punk Rock', 'K-Pop', 'Music Production', 'Songwriting', 'DJing',
    'Sound Engineering'
  ],
  Travel: [
    'Backpacking', 'Road Trips', 'Luxury Travel', 'Adventure Sports', 
    'Cultural Tours', 'Solo Travel', 'Group Tours', 'Eco-Tourism', 
    'Hiking', 'Beach Vacations', 'Mountain Climbing', 'Wildlife Safaris',
    'Camping', 'Cruises', 'City Exploration', 'Historical Sites', 
    'Culinary Tours', 'Photography Trips', 'Cycling Tours', 'Trekking'
  ],
};

function Interests() {
  const [selectedInterests, setSelectedInterests] = useState([]);

  // Toggle interest selection by clicking
  const handleInterestClick = (interest) => {
    setSelectedInterests((prevSelected) =>
      prevSelected.includes(interest)
        ? prevSelected.filter((i) => i !== interest)
        : [...prevSelected, interest]
    );
  };

  const handleSubmit = () => {
    // Handle the selected interests submission (you can send it to the server or use it in your app)
    console.log('Selected Interests:', selectedInterests);
    alert(`Your selected interests are: ${selectedInterests.join(', ')}`);
  };

  const handleClear = () => {
    setSelectedInterests([]);
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
        <button className="clear-button" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default Interests;
