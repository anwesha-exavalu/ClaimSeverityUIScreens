import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LossExposureHistogram = () => {
  // Generate data points for a gamma distribution
  // We'll create a simulated gamma distribution with a long tail
  // focusing on the 0-500000 range
  const generateGammaDistributionData = () => {
    // Parameters for gamma shape
    const alpha = 2; // Shape parameter
    const beta = 50000; // Scale parameter
    
    // Create bins for the histogram
    const binCount = 25;
    const maxValue = 500000;
    const binSize = maxValue / binCount;
    
    const bins = Array(binCount).fill(0).map((_, i) => {
      return {
        range: `$${Math.round(i * binSize).toLocaleString()}`,
        lowerBound: i * binSize,
        upperBound: (i + 1) * binSize
      };
    });
    
    // Calculate gamma PDF values for each bin
    bins.forEach(bin => {
      // Use the midpoint of each bin to calculate the PDF value
      const x = (bin.lowerBound + bin.upperBound) / 2;
      
      // Gamma PDF function
      const gammaPdf = Math.pow(x, alpha - 1) * Math.exp(-x / beta) / (Math.pow(beta, alpha) * gamma(alpha));
      
      // Scale up to get reasonable count numbers
      bin.count = Math.round(gammaPdf * 50000000);
    });
    
    return bins;
  };
  
  // Simple gamma function approximation for small values
  const gamma = (z) => {
    if (z === 1) return 1;
    if (z === 2) return 1;
    if (z === 3) return 2;
    if (z === 4) return 6;
    // For our purposes with alpha=2, this is sufficient
    return Math.sqrt(2 * Math.PI / z) * Math.pow((z / Math.E), z);
  };
  
  const data = generateGammaDistributionData();
  
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="range" 
          angle={-45} 
          textAnchor="end"
          tick={{ fontSize: 10 }}
          height={60}
        />
        <YAxis 
          label={{ value: 'Occurrences', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip 
          formatter={(value) => [`${value}`, 'Occurrences']} 
          labelFormatter={(label) => `Range: ${label}`} 
        />
        <Bar dataKey="count" fill="
#1f77b4" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LossExposureHistogram;