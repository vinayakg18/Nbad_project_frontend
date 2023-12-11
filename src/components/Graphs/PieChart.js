import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell, Label, LabelList } from 'recharts';
import './BarGraph.css';

const PieChartComponent = ({ username, selectedMonth }) => {
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
      setMonthlyData(data);
    } catch (error) {
      console.error('Error fetching monthly data:', error);
    }
  };

  const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const transformedData = monthlyData.map(item => ({
    name: item.item,
    value: item.budget || 0,
    fill: getRandomColor(),
  }));

  return (
    <div>
      <h2>Monthly Budget Summary</h2>
      {transformedData.length > 0 ? (
        <PieChart width={600} height={400}>
          <Pie
            dataKey="value"
            data={transformedData}
            cx={300}
            cy={200}
            outerRadius={120}
            fill="#8884d8"
            labelLine={false}
          >
            <LabelList dataKey="name" position="insideBottom" content={({ value, name }) => `${name}: ${value}`} />
            {transformedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <p>No data available for the selected month.</p>
      )}
    </div>
  );
};

export default PieChartComponent;
