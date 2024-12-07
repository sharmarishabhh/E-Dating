// src/HabitsForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase'; // Ensure correct Firebase path

const HabitsForm = () => {
  const [habits, setHabits] = useState({
    drinking: '',
    smoking: '',
    partying: '',
  });

  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleChange = (e) => {
    setHabits({ ...habits, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      await setDoc(doc(db, 'users', user.uid), { habits }, { merge: true });
      navigate('/language'); // Navigate to Profile or next form
    }
  };

  return (
    <div className="form-container">
      <h1>Personal Habits</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="drinking">Do you drink?</label>
        <select
          id="drinking"
          name="drinking"
          value={habits.drinking}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="often">Often</option>
          <option value="occasionally">Occasionally</option>
        </select>

        <label htmlFor="smoking">Do you smoke?</label>
        <select
          id="smoking"
          name="smoking"
          value={habits.smoking}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="often">Often</option>
          <option value="occasionally">Occasionally</option>
        </select>

        <label htmlFor="partying">Do you party?</label>
        <select
          id="partying"
          name="partying"
          value={habits.partying}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="often">Often</option>
          <option value="occasionally">Occasionally</option>
        </select>

        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default HabitsForm;
