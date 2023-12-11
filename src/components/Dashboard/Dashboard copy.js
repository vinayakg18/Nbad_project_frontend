import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Dashboard.css'; 

const Dashboard = () => {
  const location = useLocation();
  const username = location.state ? location.state.username : null;
  const [showFields, setShowFields] = useState(false); 
  const [formData, setFormData] = useState({
    month: '',
    item: '',
    budget: '',
  }); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const dataToSend = {
      username: username, 
      ...formData,
    };

    fetch('http://localhost:5000/addBudget', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then((data) => {
        
        console.log('Data sent successfully:', data);
        setShowFields(false); 
        alert('New expense successfully added! Remember: Expenses, like regrets, accumulate when ignored.'); 
        setFormData({ month: '', item: '', budget: '' }); 
      })
      .catch((error) => {
       
        console.error('Error sending data:', error);
      });
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="navbar-links">
          <a href="/" className="navbar-link">
            Profile
          </a>
          <a href="/" className="navbar-link">
            Settings
          </a>
        </div>
      </nav>
      <div className="dashboard-container">
        <h1 className="welcome-heading">Welcome, {username ? username : 'Guest'}!</h1>
        <p className="finance-description">
          Manage your finances efficiently with our intuitive tools.
        </p>
        <div className="button-container">
          <button className="dashboard-button" onClick={() => setShowFields(true)}>
            Add Expense
          </button>
          <button className="dashboard-button">Add Capacity</button>
          <button className="dashboard-button">Show Expenditure</button>
          <button className="dashboard-button">Button 4</button>
        </div>
        {showFields && (
          <div className="fields-container">
            <select
              className="dropdown"
              name="month"
              value={formData.month}
              onChange={handleChange}
            >
              {/* Options for months */}
              <option value="">Select Month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>{month}</option>
              ))}
            </select>
            <input
              type="text"
              className="item-field"
              placeholder="Item"
              name="item"
              value={formData.item}
              onChange={handleChange}
            />
            <input
              type="number"
              className="budget-field"
              placeholder="Budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
            />
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
