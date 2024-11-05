/*import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import Slider from '@mui/material/Slider';
import { Chart as ChartJS, ScatterController, LinearScale, PointElement, Tooltip } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(ScatterController, LinearScale, PointElement, Tooltip);

// Example dataset (index 0 is the earliest, index n is the latest)
const data = [
  { x: 1, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 1 },
  { x: 4, y: 5 },
  { x: 5, y: 3 },
  { x: 6, y: 4 },
];

function App() {
   // Track the current time index for the slider
   const [timeIndex, setTimeIndex] = useState(0);

   // Update scatter plot data based on the current time index
   const scatterData = {
     datasets: [
       {
         label: 'Scatter Plot',
         data: data.slice(0, timeIndex + 1), // Show points up to the selected time index
         backgroundColor: 'rgba(75, 192, 192, 1)',
       },
     ],
   };
 
   const handleSliderChange = (event, newValue) => {
     setTimeIndex(newValue);
   };

   return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <h2>Interactive Scatter Plot with Time Slider</h2>
      <Scatter data={scatterData} options={{ scales: { x: { beginAtZero: true }, y: { beginAtZero: true } } }} />
      <Slider
        value={timeIndex}
        onChange={handleSliderChange}
        aria-labelledby="time-slider"
        step={1}
        min={0}
        max={data.length - 1}
        valueLabelDisplay="auto"
        style={{ marginTop: '20px' }}
      />
    </div>
  );
}

export default App;*/


import React from 'react';
import ScatterPlot from './Scatterplot';

function App() {
  return (
    <div>
      <ScatterPlot />
    </div>
  );
}

export default App;
