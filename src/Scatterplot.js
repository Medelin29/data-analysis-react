import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import Slider from '@mui/material/Slider';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import './App.css';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

function ScatterPlot() {
    // Time-based data with points ordered chronologically (earliest to latest)
    const initialData = [
      {
        label: 'Dataset 1',
        data: [{ x: 1, y: 2 }, { x: 1.5, y: 2.3 }, { x: 1.7, y: 3 }, { x: 2, y: 2.1 }, { x: 1.5, y: 2.7 }, { x: 2, y: 1.1 }, { x: 1, y: 2.9 }],
        backgroundColor: 'rgba(255, 99, 132, 1)', // Red color
      },
      {
        label: 'Dataset 2',
        data: [{ x: 2.5, y: 2.5 }, { x: 2.5, y: 2 }, { x: 2.6, y: 2.9 }, { x: 2.6, y: 2.3 }, { x: 2.4, y: 3 }, { x: 2.7, y: 2.3 }, { x: 3, y: 2 }],
        backgroundColor: 'rgba(54, 162, 235, 1)', // Blue color
      },
      {
        label: 'Dataset 3',
        data: [{ x: 4, y: 1 }, { x: 4.1, y: 1.6 }, { x: 4.2, y: 1.5 }, { x: 4.3, y: 1.5 }, { x: 4, y: 2 }, { x: 4.8, y: 0.6 }, { x: 4.8, y: 1.9 }],
        backgroundColor: 'rgba(75, 192, 192, 1)', // Green color
      }
    ];
  
    const [scatterData, setScatterData] = useState(initialData);
    const [sliderVisible, setSliderVisible] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);

    // Calculate the max slider value based on the longest dataset length
    const maxSliderValue = Math.max(...initialData.map(dataset => dataset.data.length - 1));

    // Determine the min and max for x and y with padding
    const xValues = initialData.flatMap(dataset => dataset.data.map(point => point.x));
    const yValues = initialData.flatMap(dataset => dataset.data.map(point => point.y));
    const padding = 1; // Adjust padding as needed

    // Update scatterData to show only one point based on the slider position
    const updateScatterData = (currentSliderValue) => {
      if (sliderVisible) {
        const updatedData = initialData.map(dataset => ({
          ...dataset,
          data: [dataset.data[currentSliderValue]] // Display only the point at the slider's position
        }));
        setScatterData(updatedData);
      } else {
        setScatterData(initialData); // Show all points when slider is inactive
      }
    };

    // Toggle slider visibility
    const toggleSlider = () => {
      setSliderVisible(prev => {
        const newVisibility = !prev;
        if (!newVisibility) {
          // If slider is being turned off, reset scatterData to initial data
          setScatterData(initialData);
        } else {
          // If slider is being turned on, apply current slider value filtering
          updateScatterData(sliderValue);
        }
        return newVisibility;
      });
  };

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        updateScatterData(newValue); // Update the scatter data when the slider moves
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
      onClick: (event, elements) => {
        if (!elements.length) return;
        const elementIndex = elements[0].datasetIndex;
        const selectedGroupLabel = scatterData[elementIndex].label;
  
        const updatedData = scatterData.map((dataset) => ({
          ...dataset,
          backgroundColor: dataset.label === selectedGroupLabel
            ? dataset.backgroundColor
            : dataset.backgroundColor.replace('1)', '0.1)'),
        }));
  
        setScatterData(updatedData);
      },
    };
  
    return (
        <div className="container">
          <h2 className="title">Scatter Plot with Time-based Slider</h2>
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
                max={maxSliderValue}
                step={1}
                valueLabelDisplay="auto"
              />
            </div>
          )}
        </div>
      );
  }
  
  export default ScatterPlot;
