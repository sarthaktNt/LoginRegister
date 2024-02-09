import React, { useState } from 'react';
import './../RegisterPage.css'; 
import { Link } from 'react-router-dom';
import axios from 'axios'

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registered, setRegistered] = useState(false);

  // const handleRegister = () => {
  //   if (username && password && confirmPassword && password === confirmPassword) {
  //     // Assuming registration is successful
  //     setRegistered(true);
  //     alert('Registration successful!');
  //   } else if (password !== confirmPassword) {
  //     alert('Passwords do not match.');
  //   } else {
  //     alert('Please fill in all fields.');
  //   }
  // };

  const handleRegister = () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Make a POST request to register endpoint
    axios.post('http://localhost:3000/register', {
      username: username,
      password: password
    })
    .then(response => {
      // Handle successful registration
      setRegistered(true);
      console.log(response);
      alert('Registration successful!');
    })
    .catch(error => {
      // Handle registration error
      console.error('Error registering:', error);
      alert('Registration failed. Please try again.');
    });
  };

  return (
    <div className="register-container">
      {registered ? (
        <div>
          <h2>Registration Successful!</h2>
          <p>You can now login with your credentials.</p>
        </div>
      ) : (
        <div>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <br />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
          />
          <br />
          <button onClick={handleRegister} className="register-button">
            Register
          </button>
          <div>
      <p>
        Already Registered? <Link to="/Login">Login</Link>
      </p>
    </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;

