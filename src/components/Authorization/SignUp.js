import React, { useState } from 'react';
import Login from './Login';
import './SignUp.css';

function Signup() {
  const [signedUp, setSignedUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        setSignedUp(true);
      } else {
        
        console.error('Signup failed:', response.statusText);
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="signUp">
      {!signedUp ? (
        <div className="signUpContainer">
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
          <p>
            “Money, like motions, is something you must control to keep your life on the right
            track.” – Natasha Munson
          </p>
        </div>
      ) : (
        <div>
          <h2>Signup Successful! Please Login</h2>
          <Login />
        </div>
      )}
    </div>
  );
}

export default Signup;
