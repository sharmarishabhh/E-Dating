import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/create_profile'); // Redirect to Login page after successful sign-up
    } catch (err) {
      setError(err.message); // Display any error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container flex w-4/5 max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="flex-1 bg-pink-100 flex flex-col items-center justify-center p-10 text-center">
          <img src="/Coupleprofile.jpg" alt="Couple" className="w-4/5 mb-5" />
          <h2 className="text-2xl font-semibold mb-3">Find meaningful connections on</h2>
          <p className="text-lg text-gray-600">Discover love and connections with ease</p>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-10">
          <h1 className="text-3xl font-bold text-gray-700 mb-2">APP</h1>
          <form onSubmit={handleSignUp}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-5">Sign Up</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <label className="block mb-2 text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 border rounded mb-4"
              required
            />

            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border rounded mb-4"
              required
            />

            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border rounded mb-4"
              required
            />

            <label className="block mb-2 text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full p-3 border rounded mb-4"
              required
            />

            <label className="block mb-2 text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              pattern="[0-9]{10}"
              title="Enter a valid 10-digit phone number"
              className="w-full p-3 border rounded mb-4"
              required
            />

            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-3 rounded hover:bg-pink-600 transition-colors"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-5 text-sm text-gray-600">
            Already have an account? <a href="/login" className="text-pink-500 hover:underline">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
