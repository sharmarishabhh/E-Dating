import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import styles from './ProfileCreation.module.css';

const ProfileCreation = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    dob: '',
    height: '',
    weight: '',
    gender: '',
    sign: '', // Added missing field
  });

  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), { profile: profileData }, { merge: true });
        navigate('/institute'); // Ensure this route exists
      } catch (error) {
        console.error('Error saving profile:', error);
      }
    } else {
      console.error('User is not authenticated');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Profile Creation</h1>
      <form onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="name">Name</label>
        <input
          className={styles.input}
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          value={profileData.name}
          onChange={handleChange}
          required
        />
        <label className={styles.label} htmlFor="dob">Date of Birth</label>
        <input
          className={styles.input}
          type="date"
          id="dob"
          name="dob"
          value={profileData.dob}
          onChange={handleChange}
          required
        />
        <label className={styles.label} htmlFor="sign">Zodiac Sign</label>
        <input
          className={styles.input}
          type="text"
          id="sign"
          name="sign"
          placeholder="Enter your Zodiac Sign"
          value={profileData.sign}
          onChange={handleChange}
          required
        />
        <label className={styles.label} htmlFor="height">Height (cm)</label>
        <input
          className={styles.input}
          type="number"
          id="height"
          name="height"
          placeholder="Enter your height in cm"
          value={profileData.height}
          onChange={handleChange}
          required
        />
        <label className={styles.label} htmlFor="weight">Weight (kg)</label>
        <input
          className={styles.input}
          type="number"
          id="weight"
          name="weight"
          placeholder="Enter your weight in kg"
          value={profileData.weight}
          onChange={handleChange}
          required
        />
        <label className={styles.label} htmlFor="gender">Gender</label>
        <select
          className={styles.input}
          id="gender"
          name="gender"
          value={profileData.gender}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button type="submit" className={styles.button}>Next</button>
      </form>
    </div>
  );
};

export default ProfileCreation;
