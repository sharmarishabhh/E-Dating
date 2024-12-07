import React from 'react';
import './content.css';

const Content = () => {
  return (

<div className="container">
        <div className="card">
          {/* Header */}
          <div className="profile-header">
            <img
              src="https://via.placeholder.com/70"
              alt="Profile"
              className="profile-image"
            />
            <div>
              <h2>Your LoveConnect Profile</h2>
              <p>Username</p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="content-grid">
            {/* Match Preferences */}
            <div className="section-card">
              <h3>Match Preferences</h3>
              <div className="space-y-3">
                {['John Doe', 'Emily Smith', 'Michael'].map((name) => (
                  <div key={name} className="flex justify-between items-center">
                    <span>{name}</span>
                    <span className="text-pink-500 text-sm">Seeker</span>
                  </div>
                ))}
              </div>
              <input
                type="text"
                placeholder="Enter partner preferences"
              />
              <button className="primary">Search</button>
            </div>

            {/* Premium Section */}
            <div className="section-card">
              <h3>Premium</h3>
              <p>Unlock unlimited matches and chat features.</p>
              <button className="primary">Upgrade</button>
            </div>

            {/* Privacy & Security */}
            <div className="section-card">
              <h3>Privacy & Security</h3>
              <p>Control who can view your profile and chat with you.</p>
              <div className="button-group">
                <button className="primary">Block</button>
                <button className="secondary">Report</button>
              </div>
            </div>

            {/* Manage Connections */}
            <div className="section-card">
              <h3>Manage Connections</h3>
              <p>Manage your connections easily. Ready to move on from a match?</p>
              <button className="primary">Unmatch</button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Content;