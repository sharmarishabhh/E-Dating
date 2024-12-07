import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import styles from './Matches.module.css'; // Import CSS styles

const Matches = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get the current logged-in user
        const user = auth.currentUser;
        if (!user) {
          throw new Error('User is not logged in.');
        }

        // Use the user's unique ID (uid) to fetch profile data
        const userId = user.uid;
        console.log('Fetching data for user ID:', userId); // Debugging purpose

        const userDocRef = doc(db, 'users', userId); // Reference to the user's document
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setProfileData(userDoc.data().profile); // Extract profile data
        } else {
          throw new Error('Profile data not found.');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile(); // Trigger the profile fetch
  }, []);

  if (loading) return <div>Loading your profile...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>Your Profile</h1>

      <div className={styles.profileDetails}>
        <p><strong>Name:</strong> {profileData.name}</p>
        <p><strong>Date of Birth:</strong> {profileData.dob}</p>
        <p><strong>Height:</strong> {profileData.height} cm</p>
        <p><strong>Weight:</strong> {profileData.weight} kg</p>
        <p><strong>Gender:</strong> {profileData.gender}</p>
        <p><strong>Zodiac Sign:</strong> {profileData.sign}</p>
      </div>

      <div className={styles.buttonContainer}>
        <button
          className={styles.actionButton}
          onClick={() => alert('Action 1 clicked!')}
        >
          Action 1
        </button>
        <button
          className={styles.actionButton}
          onClick={() => alert('Action 2 clicked!')}
        >
          Action 2
        </button>
      </div>
    </div>
  );
};

export default Matches;
