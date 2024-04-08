import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook to handle redirects
import './LoginPage.css'; // Import CSS file for styling

function LoginPage() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const history = useNavigate(); // Create history object for programmatic navigation

  const handleRetrieveDetails = async () => {
    // try {
      const response = await fetch(`http://18.223.122.141:8000/api/user/${username}`);
      console.log(response);
      const data = await response.json();
      if (response.ok) {
        // User details retrieved successfully, redirect to form with details
        console.log('User details:', data);
        // Redirect to form page with received details
        history('/form', { state: { userDetails: data } });
      } else {
        // User not found, show message to create user
        if (data.message === "Username does not exist") {
          setMessage(data.message);
        } else {
          // Handle other error messages, if any
          setMessage('Error: ' + data.message);
        }
      }
    // } catch (error) {
    //   console.error('Error retrieving user details:', error);
    //   setMessage('Error retrieving user details. Please try again later.');
    // }
  };

  const handleCreateUser = async () => {
    try {
      const response = await fetch('http://18.223.122.141:8000/api/user/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      if (response.ok) {
        // User created successfully
        setMessage('Username created');
        // Show alert for username created
        alert('Username created');
        history('/form');

      } else {
        // User already exists, show error message
        setMessage(data.username[0]);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setMessage('Error creating user. Please try again later.');
    }
  };

  return (
    <>
    <header className="page-header">
      <h1>Application For Employment Authorization</h1>
      <h2>Form I-765</h2>
    </header>
    <div className="login-container">
      <div className="form-content">
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="form-control" // Make sure to apply form-control class for styling
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button className="btn" onClick={handleRetrieveDetails}>Retrieve Details</button>
          <button className="btn" onClick={handleCreateUser}>Create User</button>
        </div>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
    </>
  );
  
}

export default LoginPage;
