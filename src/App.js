import React from 'react';
import './App.css';
import PieChartComponent from './PieChartComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Browser Requests Pie Chart</h1>
        <PieChartComponent />
      </header>
    </div>
  );
}

export default App;
