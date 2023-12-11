import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  let intervalId = null;

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { token } = data;

        
        localStorage.setItem('token', token);

        
        const decodedToken = parseJwt(token);
        const currentTime = Math.floor(Date.now() / 1000); 
        const expiryTime = decodedToken.exp - currentTime;

        
        localStorage.setItem('tokenExpiry', expiryTime);
        console.log('Login successful!');
        startFunctionAfterDelay();
        navigate('/dashboard', { state: { username } });
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const startFunctionAfterDelay = () => {
    const initialDelay = 50000; 
    const recurringDelay = 60000; 

    setTimeout(() => {
      showConfirmationDialogue();
      intervalId = setInterval(showConfirmationDialogue, recurringDelay); 
    }, initialDelay);
  };

  const showConfirmationDialogue = () => {
    const userResponse = window.confirm('Do you want to proceed?');

    if (userResponse) {
      console.log('Session refreshed');
    } else {
      console.log('User chose No');
      logout();
      
    }
  };

  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    console.log('Token expired and user logged out');
    clearInterval(intervalId);
    navigate('/login');
  };

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
