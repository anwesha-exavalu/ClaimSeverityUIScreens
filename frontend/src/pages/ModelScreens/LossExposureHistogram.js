import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LossExposureHistogram = () => {
  // Data extracted from the image
  const data = [
    { range: '$0', count: 3 },
    { range: '$100,000', count: 17 },
    { range: '$200,000', count: 25 },
    { range: '$300,000', count: 43 },
    { range: '$400,000', count: 48 },
    { range: '$500,000', count: 87 },
    { range: '$600,000', count: 86 },
    { range: '$700,000', count: 90 },
    { range: '$800,000', count: 95 },
    { range: '$900,000', count: 105 },
    { range: '$1,000,000', count: 80 },
    { range: '$1,100,000', count: 70 },
    { range: '$1,200,000', count: 67 },
    { range: '$1,300,000', count: 65 },
    { range: '$1,400,000', count: 58 },
    { range: '$1,500,000', count: 40 },
    { range: '$1,600,000', count: 30 },
    { range: '$1,700,000', count: 20 },
    { range: '$1,800,000', count: 13 },
    { range: '$1,900,000', count: 8 },
    { range: '$2,000,000', count: 5 },
    { range: '$2,100,000', count: 2 },
    { range: '$2,200,000', count: 1 },
    { range: '$2,300,000', count: 1 },
    { range: '$2,400,000', count: 0 },
    { range: '$2,500,000', count: 2 }
  ];

  return (
    <div style={{ width: '100%', height: 344, marginTop: 20 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 70 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
          <XAxis 
            dataKey="range" 
            angle={-45}
            textAnchor="end"
            height={70}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => value}
            label={{ 
              value: 'Claim Cost', 
              position: 'insideBottom', 
              offset: -10,
              style: { textAnchor: 'middle' }
            }}
          />
          <YAxis 
            label={{ 
              value: 'Number of Occurrences', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            }}
          />
          <Tooltip formatter={(value) => [`${value}`, 'Occurrences']} />
          <Bar 
            dataKey="count" 
            fill="#1f77b4" // A common D3-style blue that's often used for data visualizations
            barSize={16}  // Adjust the width of the bars to match the image
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LossExposureHistogram;