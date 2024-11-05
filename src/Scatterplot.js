import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import Slider from '@mui/material/Slider';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import './App.css'


ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

function ScatterPlot() {
    // Sample data representing four groups with two time snapshots each
    const initialData = [
      {
        label: 'Dataset 1 - Time 1',
        data: [{ x: 1, y: 2 }, { x: 1.5, y: 2.3 }, { x: 1.7, y: 3 }, { x: 2, y: 2.1 }, { x: 1.5, y: 2.7 }, { x: 2, y: 1.1 }, { x: 1, y: 2.9 }],
        backgroundColor: 'rgba(255, 99, 132, 1)', // Red color
      },
      {
        label: 'Dataset 1 - Time 2',
        data: [{ x: 2.5, y: 2.5 }, { x: 2.5, y: 2 }, { x: 2.6, y: 2.9 }, { x: 2.6, y: 2.3 }, { x: 2.4, y: 3 }, { x: 2.7, y: 2.3 }, { x: 3, y: 2 }],
        backgroundColor: 'rgba(255, 99, 132, 0.5)', // Lighter Red
      },
      {
        label: 'Dataset 2 - Time 1',
        data: [{ x: 4, y: 1 }, { x: 4.1, y: 1.6 }, { x: 4.2, y: 1.5 }, { x: 4.3, y: 1.5 }, { x: 4, y: 2 }, { x: 4.8, y: 0.6 }, { x: 4.8, y: 1.9 }],
        backgroundColor: 'rgba(54, 162, 235, 1)', // Blue color
      }
    ];
  
    const [scatterData, setScatterData] = useState(initialData);
    const [sliderVisible, setSliderVisible] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);

     // Determine the min and max for x and y with padding
    const xValues = scatterData.flatMap(dataset => dataset.data.map(point => point.x));
    const yValues = scatterData.flatMap(dataset => dataset.data.map(point => point.y));
    const padding = 1; // Adjust padding as needed
  
    // Highlight the dataset that contains the selected point
    const handlePointClick = (event, elements) => {
      if (!elements.length) return; // No element was clicked
      const elementIndex = elements[0].datasetIndex; // Get the dataset index of the clicked point
      const selectedGroupLabel = scatterData[elementIndex].label.split(' - ')[0]; // Extract group name
  
      const updatedData = scatterData.map((dataset) => {
        const isSelectedGroup = dataset.label.startsWith(selectedGroupLabel);
        return {
          ...dataset,
          backgroundColor: isSelectedGroup ? dataset.backgroundColor : dataset.backgroundColor.replace('1)', '0.1)'),
          borderWidth: isSelectedGroup ? 2 : 0.5, // Thicker border for selected group
        };
      });
  
      setScatterData(updatedData);
    };

      // Toggle slider visibility
    const toggleSlider = () => {
        setSliderVisible(prev => !prev); // Toggle slider visibility state
    };

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue); // Update slider value in state
    };
  
    const chartOptions = {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          beginAtZero: true,
          min: Math.min(...xValues) - padding,
          max: Math.max(...xValues) + padding,
        },
        y: {
          beginAtZero: true,
          min: Math.min(...yValues) - padding,
          max: Math.max(...yValues) + padding,
        },
      },
      onClick: handlePointClick, // Attach click handler to the chart
    };
  
    return (
        <div className="container">
          <h2 className="title">Scatter Plot with Toggleable Slider</h2>
          <Scatter data={{ datasets: scatterData }} options={chartOptions} />
    
          {/* Toggle Slider Switch */}
          <div className="toggle-container">
            <span className="toggle-label">Toggle Slider</span>
            <label className="oval-switch">
              <input type="checkbox" checked={sliderVisible} onChange={toggleSlider} />
              <span className="track"></span>
              <span className="thumb"></span>
            </label>
          </div>
    
          {/* Conditionally Render Slider */}
          {sliderVisible && (
            <div className="slider-container">
              <Slider
                value={sliderValue}
                onChange={handleSliderChange}
                aria-labelledby="time-slider"
                min={0}
                max={10} // Adjust as needed
                step={1}
                valueLabelDisplay="auto"
              />
            </div>
          )}
        </div>
      );
  }
  
  export default ScatterPlot;