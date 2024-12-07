// src/AcademicDetails.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase'; // Ensure correct Firebase config

const AcademicDetails = () => {
  const [details, setDetails] = useState({
    program: '',
    year: '',
    branch: '',
  });

  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      await setDoc(doc(db, 'users', user.uid), { academicDetails: details }, { merge: true });
      navigate('/Hobbies'); // Navigate to the profile page or next form
    }
  };

  return (
    <div className="form-container">
      <h1>Academic Details</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="program">Program</label>
        <select
          id="program"
          name="program"
          value={details.program}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select your program</option>
          <option value="btech">B.Tech</option>
          <option value="mtech">M.Tech</option>
          <option value="bsc">B.Sc</option>
          <option value="msc">M.Sc</option>
          <option value="phd">PHD</option>
        </select>

        <label htmlFor="year">Year</label>
        <select
          id="year"
          name="year"
          value={details.year}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select your year</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>

        <label htmlFor="branch">Branch</label>
        <select
          id="branch"
          name="branch"
          value={details.branch}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select your branch</option>
          <option value="cse">Computer Science</option>
          <option value="ee">Electrical Engineering</option>
          <option value="me">Mechanical Engineering</option>
          <option value="ce">Civil Engineering</option>
          <option value="ai">Artificial Intelligence</option>
          <option value="ch">Chemical Engineering</option>
          <option value="mc">Maths and Computing</option>
          <option value="mm">Metallurgy</option>
        </select>

        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default AcademicDetails;
