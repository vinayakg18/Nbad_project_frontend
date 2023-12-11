import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './BarGraph.css';

const BarGraph = ({ username, selectedMonth }) => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    fetchMonthlyData(username, selectedMonth);
  }, [username, selectedMonth]);

  const fetchMonthlyData = async (username, selectedMonth) => {
    try {
      const response = await fetch(`http://localhost:5000/getBudgetsByMonth?username=${username}&month=${selectedMonth}`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      //console.log(data);
      setMonthlyData(data);
    } catch (error) {
      console.error('Error fetching monthly data:', error);
    }
  };

  const transformedData = monthlyData.map(item => ({
    itemType: item.item,
    budget: item.budget || 0,
    capacity: item.capacity || 0,
  }));

  return (
    <div>
      <h2>Monthly Capacity vs Budget</h2>
      {transformedData.length > 0 ? (
        <BarChart
          width={600}
          height={500}
          data={transformedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="itemType" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#8884d8" barSize={20} />
          <Bar dataKey="capacity" fill="#82ca9d" barSize={20} />
        </BarChart>
      ) : (
        <p>No data available for the selected month.</p>
      )}
    </div>
  );
};

export default BarGraph;
