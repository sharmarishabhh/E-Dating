// src/AboutMe.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase'; // Firebase setup
import "./about-style.css"; // Import scoped CSS

const AboutMe = () => {
  const [aboutData, setAboutData] = useState({
    description: '',
    interests: '',
    lookingFor: '',
  });

  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAboutData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      await setDoc(
        doc(db, 'users', user.uid),
        { about: aboutData },
        { merge: true }
      );
      navigate('/upload_picture'); // Redirect to profile or next page
    }
  };

  return (
    <div className="about-page">
      <div className="form-container">
        <h1>About Me</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="description">Tell us about yourself</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            placeholder="Write a brief description about yourself..."
            value={aboutData.description}
            onChange={handleChange}
            required
          ></textarea>

          <label htmlFor="interests">What are your interests?</label>
          <textarea
            id="interests"
            name="interests"
            rows="5"
            placeholder="List your interests and hobbies..."
            value={aboutData.interests}
            onChange={handleChange}
            required
          ></textarea>

          <label htmlFor="lookingFor">What are you looking for in a partner?</label>
          <textarea
            id="lookingFor"
            name="lookingFor"
            rows="5"
            placeholder="Describe your ideal partner..."
            value={aboutData.lookingFor}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
};

export default AboutMe;
