// src/components/SignIn.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../authSlice';
import axios from '../client';

const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await axios.post('/api/signin', { email, password });
      const user = response.data; // Assuming your backend sends user details upon successful login
      dispatch(setUser(user));
      // Redirect or perform other actions upon successful login
    } catch (error) {
      console.error('Error signing in:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <div>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;
