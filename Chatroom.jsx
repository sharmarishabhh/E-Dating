// src/ChatRoom.js
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore instance
import { useNavigate } from 'react-router-dom';
import './chatroom.css'

const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  // Ensure the user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) navigate('/login'); // Redirect if not logged in
    });
    return () => unsubscribe();
  }, [navigate]);

  // Load chat messages in real-time
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Handle sending a message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    try {
      await addDoc(collection(db, 'messages'), {
        text: message,
        createdAt: new Date(),
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
      });
      setMessage(''); // Clear the input
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-screen-2xl  shadow-md rounded p-6 backgroundc">
        <h1 className="text-5xl font-bold mb-4 heading ">Chat Room</h1>
        <div className=" overflow-y-auto mb-4 chat">
          {messages.map((msg) => (
            <div key={msg.id} className={`mb-2 ${msg.uid === auth.currentUser.uid ? 'text-right' : 'text-left'}`}>
              <p className="text-sm text-gray-500">{msg.email}</p>
              <p className={`inline-block p-2 rounded ${msg.uid === auth.currentUser.uid ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>
                {msg.text}
              </p>
            </div>
          ))}
        </div>
       

          <form onSubmit={sendMessage} className="flex space-x-8">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border p-2 w-full rounded-l"
          />
          <button type="submit" className="bg-blue-500 w-28 text-white px-4 rounded-r">
            Send
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default ChatRoom;
