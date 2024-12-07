import React, { useEffect, useState } from 'react';
import './main.css';
import Home from './Home1';
import Button from '../Chatroom/Button';
import Button_p from '../Profile/Button_p';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Main = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch users from Firestore in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const fetchedUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(fetchedUsers);
    });

    return () => unsubscribe(); // Cleanup the subscription
  }, []);

  // Navigate to the previous user
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : users.length - 1));
  };

  // Navigate to the next user
  const handleNext = () => {
    setCurrentIndex((prev) => (prev < users.length - 1 ? prev + 1 : 0));
  };

  // Get the current user based on the index
  const currentUser = users[currentIndex];

  return (
    <div className="main-page-container">
      {/* Upper Navbar */}
      <div className="upper-navbar">
        <h1>Your LoveConnect</h1>
        <input type="text" placeholder="Search for matches" className="search-bar" />
      </div>

      <div className="content-area">
        {/* Left Sidebar */}
        <div className="sidebar">
          <ul>
            <li>Matches</li>
            <li><Button /></li>
            <li>Upload</li>
            <li><Home /></li>
            <li><Button_p /></li>
          </ul>
        </div>

        {/* Profile Section */}
        <div className="profile-section">
          {users.length > 0 ? (
            <div className="match-card">
              <button className="nav-button left" onClick={handlePrev}>
                &#10094; {/* Backward Arrow */}
              </button>
              <div className="card-content">
                <img
                  src={currentUser?.image || "placeholder.jpg"} // Fallback image
                  alt={currentUser?.name || "User"}
                  className="match-image"
                />
                <h3>
                  {currentUser?.name || "Anonymous"}, {currentUser?.age || "N/A"}
                </h3>
                <p>{currentUser?.location || "Unknown location"}</p>
                <p>{currentUser?.description || "No description available."}</p>
              </div>
              <button className="nav-button right" onClick={handleNext}>
                &#10095; {/* Forward Arrow */}
              </button>
            </div>
          ) : (
            <p>Loading users or no users available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
