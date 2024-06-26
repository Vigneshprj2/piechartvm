import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const PieChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/browsers')
      .then(response => {
        const responseData = response.data;
        const chartData = Object.keys(responseData).map(key => ({
          name: key,
          value: responseData[key]
        }));
        setData(chartData);
      })
      .catch(error => {
        console.error('Error fetching the browser data', error);
      });
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF', '#FF0000'];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
