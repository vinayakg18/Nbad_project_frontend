import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import './BarGraph.css';

const AreaGraph = ({ username, selectedMonth }) => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    fetchMonthlyData(username, selectedMonth);
  }, [username, selectedMonth]);

  const fetchMonthlyData = async (username, selectedMonth) => {
    try {
      const response = await fetch(
        `http://143.198.14.75:5000/getBudgetsByMonth?username=${username}&month=${selectedMonth}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setMonthlyData(data);
    } catch (error) {
      console.error('Error fetching monthly data:', error);
    }
  };

  const transformedData = monthlyData.map((item) => ({
    itemType: item.item,
    budget: item.budget || 0,
    capacity: item.capacity || 0,
  }));

  return (
    <div>
      <h2>Monthly Capacity vs Budget (Area Chart)</h2>
      {transformedData.length > 0 ? (
        <AreaChart
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
          <Area
            type="monotone"
            dataKey="budget"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="capacity"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      ) : (
        <p>No data available for the selected month.</p>
      )}
    </div>
  );
};

export default AreaGraph;
