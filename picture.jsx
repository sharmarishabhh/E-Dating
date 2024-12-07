// src/ProfilePictureUpload.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage, auth, db } from '../../firebase'; // Ensure correct imports
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import './picture.css'; // Import CSS

const ProfilePictureUpload = () => {
  const [file, setFile] = useState(null); // Store the selected file
  const [preview, setPreview] = useState('profile.jpg'); // Default preview image
  const [isUploading, setIsUploading] = useState(false); // Track upload status
  const navigate = useNavigate();

  // Handle file selection and set preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(selectedFile);
      console.log('Selected file:', selectedFile.name); // Debug log
    }
  };

  // Upload the file to Firebase Storage and save the URL in Firestore
  const handleUpload = async (e) => {
    e.preventDefault();
    const user = auth.currentUser; // Get the current user
    if (user && file) {
      setIsUploading(true); // Set uploading status
      try {
        const storageRef = ref(storage, `profile_pictures/${user.uid}`);
        console.log('Uploading file to:', storageRef.fullPath); // Debug log

        // Upload the file to Firebase Storage
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        console.log('File uploaded successfully. URL:', downloadURL);

        // Save the download URL to Firestore
        await updateDoc(doc(db, 'users', user.uid), {
          profilePicture: downloadURL,
        });

        setIsUploading(false); // Reset uploading status
        navigate('/profile'); // Redirect to profile page
      } catch (error) {
        setIsUploading(false); // Reset uploading status
        console.error('Error uploading file:', error);
      }
    } else {
      console.warn('No user or file selected.'); // Debug log
    }
  };

  return (
    <div className="form-container">
      <h1>Upload Profile Picture</h1>
      <div
        id="profile-pic"
        className="profile-image"
        style={{ backgroundImage: `url(${preview})` }}
      ></div>
      <form onSubmit={handleUpload}>
        <label htmlFor="file-upload">Choose a Profile Picture</label>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <small>Accepted formats: JPG, JPEG, PNG, GIF</small>
        <button type="submit" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default ProfilePictureUpload;
