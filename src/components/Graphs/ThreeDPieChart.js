import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

const ThreeDPieChart = ({ username, selectedMonth }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getBudgetsByMonth?username=${username}&month=${selectedMonth}`);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        
        const data = await response.json();
        console.log('Fetched data:', data);

        if (Array.isArray(data) && data.length > 0) {
          const chartLabels = [];
          const chartValues = [];
          const chartBackgroundColors = [];

          for (let i = 0; i < data.length; i++) {
            const item = data[i];
            if (item && typeof item === 'object') {
              const name = item.item;
              const value = item.budget || 0;
              const fill = getRandomColor();

              if (name) {
                chartLabels.push(name);
              }
              if (value !== undefined) {
                chartValues.push(value);
              }
              if (fill) {
                chartBackgroundColors.push(fill);
              }
            }
          }

          if (chartLabels.length > 0 && chartValues.length > 0 && chartBackgroundColors.length > 0) {
            setChartData({
              labels: chartLabels,
              datasets: [
                {
                  data: chartValues,
                  backgroundColor: chartBackgroundColors,
                  hoverBackgroundColor: chartBackgroundColors,
                },
              ],
            });
          } else {
            console.log('Invalid data for chart.');
            setChartData({}); // Empty chart data if there's invalid data
          }
        } else {
          console.log('No valid data found.');
          setChartData({}); // Empty chart data if there's no valid data
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [username, selectedMonth]);

  const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default ThreeDPieChart;
