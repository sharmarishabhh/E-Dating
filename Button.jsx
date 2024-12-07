// src/Home.js
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import ChatRoom from './Chatroom';

const Button = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Set the user if logged in
      } else {
        navigate('/login'); // Redirect to Login if not logged in
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [navigate]);

  return (
    <div className="">
      <div className="">
        {user ? (
          <>
            
            <button
              onClick={() => navigate('/chat')}  // Navigate to Chat Room
              className=""
            >
               Chat Room
            </button>

           
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Button;
