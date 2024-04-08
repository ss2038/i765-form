// ReviewPage.js

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ReviewPage.css'; // Ensure you create a corresponding CSS file for styling

function ReviewPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const formData = state?.formData;

  if (!formData) {
    navigate('/form'); // Redirect back if formData is not available
    return null; // or you could display a loading indicator or a message
  }

  const handleEdit = () => {
    navigate('/form', { state: { formData } });
  };

  // Function to display form data keys and values
  const renderFormData = () => {
    return Object.entries(formData).map(([key, value]) => (
      <p key={key}><strong>{key}:</strong> {value.toString()}</p>
    ));
  };

  return (
    <div className="review-container">
      <h1>Review Your Details</h1>
      <div className="review-content">
        {renderFormData()}
      </div>
      <button onClick={handleEdit} className="edit-button">Edit</button>
    </div>
  );
}

export default ReviewPage;
