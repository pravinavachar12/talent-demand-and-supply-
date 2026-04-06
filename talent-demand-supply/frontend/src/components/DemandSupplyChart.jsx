import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DemandSupplyChart = ({ employees }) => {
  const skills = ["React", "Node.js", "Python", "MongoDB"];
  
  // Calculate how many employees have each skill
  const supplyData = skills.map(skill => 
    employees.filter(emp => emp.skills.some(s => s.toLowerCase() === skill.toLowerCase())).length
  );

  const marketDemand = [10, 8, 12, 6]; // Hardcoded target values

  const data = {
    labels: skills,
    datasets: [
      {
        label: 'Internal Supply (Our Talent)',
        data: supplyData,
        backgroundColor: 'rgba(30, 64, 175, 0.8)', // Blue
      },
      {
        label: 'Market Demand (Requirement)',
        data: marketDemand,
        backgroundColor: 'rgba(239, 68, 68, 0.5)', // Red/Transparent
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Skill Gap Visualization' },
    },
  };

  return <div className="bg-white p-6 rounded-xl shadow-md"><Bar options={options} data={data} /></div>;
};

export default DemandSupplyChart;