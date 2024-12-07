// src/DemographicDetails.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase'; // Firebase setup

const languageOptions = [
  'Hindi', 'English', 'Bengali', 'Telugu', 'Marathi',
  'Tamil', 'Urdu', 'Punjabi', 'Gujarati', 'Malayalam'
];

const DemographicDetails = () => {
  const [details, setDetails] = useState({
    primaryLanguage: '',
    spokenLanguages: [],
    religion: '',
    ethnicity: '',
    otherLanguage: '',
    otherReligion: '',
    otherEthnicity: '',
  });

  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setDetails((prev) => ({
        ...prev,
        spokenLanguages: checked
          ? [...prev.spokenLanguages, value]
          : prev.spokenLanguages.filter((lang) => lang !== value),
      }));
    } else {
      setDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      await setDoc(
        doc(db, 'users', user.uid),
        { demographicDetails: details },
        { merge: true }
      );
      navigate('/About'); // Go to profile or next form
    }
  };

  return (
    <div className="form-container">
      <h1>Demographic Details</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="primaryLanguage">Primary Language Spoken</label>
        <select
          id="primaryLanguage"
          name="primaryLanguage"
          value={details.primaryLanguage}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select your primary language</option>
          {languageOptions.map((lang) => (
            <option key={lang} value={lang.toLowerCase()}>{lang}</option>
          ))}
          <option value="other">Other</option>
        </select>
        {details.primaryLanguage === 'other' && (
          <input
            type="text"
            name="otherLanguage"
            placeholder="Please specify"
            value={details.otherLanguage}
            onChange={handleChange}
          />
        )}

        <label>Languages Spoken</label>
        <div className="multi-select-container">
          {languageOptions.map((lang) => (
            <div key={lang} className="multi-select-option">
              <label>
                <input
                  type="checkbox"
                  name="spokenLanguages"
                  value={lang.toLowerCase()}
                  checked={details.spokenLanguages.includes(lang.toLowerCase())}
                  onChange={handleChange}
                />
                {lang}
              </label>
            </div>
          ))}
        </div>

        <label htmlFor="religion">Religion</label>
        <select
          id="religion"
          name="religion"
          value={details.religion}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select your religion</option>
          <option value="hinduism">Hinduism</option>
          <option value="islam">Islam</option>
          <option value="christianity">Christianity</option>
          <option value="sikhism">Sikhism</option>
          <option value="buddhism">Buddhism</option>
          <option value="jainism">Jainism</option>
          <option value="other">Other</option>
        </select>
        {details.religion === 'other' && (
          <input
            type="text"
            name="otherReligion"
            placeholder="Please specify"
            value={details.otherReligion}
            onChange={handleChange}
          />
        )}

        <label htmlFor="ethnicity">Ethnicity</label>
        <select
          id="ethnicity"
          name="ethnicity"
          value={details.ethnicity}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select your ethnicity</option>
          <option value="indigenous">Indigenous</option>
          <option value="dravidian">Dravidian</option>
          <option value="aryan">Aryan</option>
          <option value="tribal">Tribal</option>
          <option value="other">Other</option>
        </select>
        {details.ethnicity === 'other' && (
          <input
            type="text"
            name="otherEthnicity"
            placeholder="Please specify"
            value={details.otherEthnicity}
            onChange={handleChange}
          />
        )}

        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default DemographicDetails;
