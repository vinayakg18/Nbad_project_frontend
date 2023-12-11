import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Dashboard.css'; 
import BarGraph from '../Graphs/BarGraph';
import PieChartComponent from '../Graphs/PieChart';
import ThreeDPieChart from '../Graphs/ThreeDPieChart';
import AreaGraph from '../Graphs/AreaGraph';

const Dashboard = () => {
  const location = useLocation();
  const username = location.state ? location.state.username : null;
  

  const [showExpenditure, setShowExpenditure] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [expenditureData, setExpenditureData] = useState([]);

  const [showGraphs, setShowGraphs] = useState(false);

  const [showFields, setShowFields] = useState(false); 
  const [formData, setFormData] = useState({
    month: '',
    item: '',
    budget: '',
  }); 

  const [showCapacityFields, setShowCapacityFields] = useState(false); 
  const [capacityData, setCapacityData] = useState({
    month: '',
    item: '',
    capacity: '',
  }); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleButtonClick = () => {
    setShowFields(true);
    setShowCapacityFields(false);
    setShowExpenditure(false);
    setShowGraphs(false);
  };

  const handleCapacityClick = () => {
    setShowCapacityFields(true);
    setShowFields(false);
    setShowExpenditure(false);
    setShowGraphs(false);
  };

  const handleExpenditureClick = () => {
    setShowCapacityFields(false);
    setShowFields(false);
    setShowExpenditure(true);
    setShowGraphs(false);
  };

  const handleGraphClick = () => {
    setShowCapacityFields(false);
    setShowFields(false);
    setShowExpenditure(false);
    setShowGraphs(true);
  };

  const handleCancelFields = () => {
    setShowFields(false);
  };

  const handleCancelCapacityFields = () => {
    setShowCapacityFields(false);
  };

  const handleCancelExpenditureFields = () => {
    setShowExpenditure(false);
  }

  const handleSubmit = () => {
    const dataToSend = {
      username: username, 
      ...formData,
    };

    fetch('http://143.198.14.75:5000/addBudget', {
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
        alert('New expense successfully added! Remember: Expenses, like regrets, accumulate when ignored.'); // Show success message (you can replace this with a modal)
        setFormData({ month: '', item: '', budget: '' }); 
      })
      .catch((error) => {
       
        console.error('Error sending data:', error);
      });
  };

  const handleCapacityChange = (e) => {
    const { name, value } = e.target;
    setCapacityData({
      ...capacityData,
      [name]: value,
    });
  };

  const handleCapacitySubmit = () => {
    const dataToSend = {
      username: username, 
      ...capacityData,
    };
    console.log(dataToSend);
    fetch('http://143.198.14.75:5000/addCapacity', {
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
        
        console.log('Capacity data sent successfully:', data);
        setShowCapacityFields(false); 
        alert('Capacity added successfully!');
        setCapacityData({ month: '', item: '', capacity: '' }); 
      })
      .catch((error) => {
        
        console.error('Error sending capacity data:', error);
      });
  };



  const handleShowExpenditure = async () => {
    try {
      const response = await fetch(`http://143.198.14.75:5000/getBudgetsByMonth?username=${username}&month=${selectedMonth}`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setExpenditureData(data);
        setShowExpenditure(true);
        setShowFields(false);
        setShowCapacityFields(false);
      } else {
        throw new Error('Data received is not an array.');
      }
    } catch (error) {
      console.error('Error fetching expenditure data:', error);
    }
  };
  
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };
  
  useEffect(() => {
    if (showExpenditure && selectedMonth) {
      handleShowExpenditure();
    }
  }, [showExpenditure, selectedMonth]);
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="dashboard">
      <div className="scroll-container">
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
        <div className={`button-container ${showFields || showCapacityFields || showExpenditure || showGraphs? 'hide-buttons' : ''}`}>
          <button className="dashboard-button" onClick={handleButtonClick}>
            Add Expense
          </button>
          <button className="dashboard-button" onClick={handleCapacityClick}>
            Add Capacity
          </button>
          <button className="dashboard-button" onClick={handleExpenditureClick}>
          Show Expenditure
        </button>
          <button className="dashboard-button" onClick={handleGraphClick}>Graphs</button>
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
          <div className="button-group">
            <button className="cancel-button" onClick={handleCancelFields}>
              Cancel
            </button>
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          </div>
        )}
        {showCapacityFields && (
          <div className="fields-container">
            <select
              className="dropdown"
              name="month"
              value={capacityData.month}
              onChange={handleCapacityChange}
            >
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
              value={capacityData.item}
              onChange={handleCapacityChange}
            />
            <input
              type="number"
              className="budget-field"
              placeholder="Capacity"
              name="capacity"
              value={capacityData.capacity}
              onChange={handleCapacityChange}
            />
          <div className="button-group">
            <button className="cancel-button" onClick={handleCancelCapacityFields}>
              Cancel
            </button>
            <button className="submit-button" onClick={handleCapacitySubmit}>
              Submit
            </button>
          </div>
          </div>
        )}
    {showExpenditure && (
      <div className="table-container">
        <h2>Expenditure</h2>
        <select
          className="dropdown"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {/* Options for months */}
          <option value="">Select Month</option>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Item</th>
              <th>Budget</th>
              <th>Limit</th>
              {/* Add other table headings as needed */}
            </tr>
          </thead>
          <tbody>
            {expenditureData.map((item, index) => (
              <tr key={index}>
                <td>{item.month}</td>
                <td>{item.item}</td>
                <td>{item.budget}</td>
                <td>{item.capacity || 0}</td>
                {/* Add other table cells based on your data structure */}
              </tr>
            ))}
          </tbody>
        </table>
        <button className="goback" onClick={handleCancelExpenditureFields}>
              Goto Dashboard
            </button>
      </div>
    )}
{showGraphs && (
  <div className="graphContainer">
    <select
      className="dropdown"
      value={selectedMonth}
      onChange={handleMonthChange}
    >
      {/* Options for months */}
      <option value="">Select Month</option>
      {months.map((month, index) => (
        <option key={index} value={month}>
          {month}
        </option>
      ))}
    </select>
    <div className="charts-container">
      <div className="chart">
        <BarGraph username={username} selectedMonth={selectedMonth}/>
      </div>
      <div className="chart">
        <PieChartComponent username={username} selectedMonth={selectedMonth}/>
      </div>
      <div className="chart">
        <AreaGraph username={username} selectedMonth={selectedMonth}/>
      </div>
    </div>
  </div>  
)}
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
