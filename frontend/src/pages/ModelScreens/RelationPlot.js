import React, { useState, useEffect } from 'react';
import { Select, Card, Typography } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {InfoCircleOutlined } from "@ant-design/icons";
const { Option } = Select;
const { Title } = Typography;

const RelationPlot = () => {
  const [selectedVariable, setSelectedVariable] = useState('Initial_Class_of_Claim');

  // Updated variable mapping
  const variableMapping = {
    Initial_Class_of_Claim: "Initial Class of Claim",
    Claimant_Injuries: "Claimant Injuries",
    Repairable_Flag: "Repairable Flag",
    Initial_Attorney_Involvement: "Initial Attorney Involvement",
    Primary_Cause_of_Accident: "Primary Cause of Accident",
    Rate_Class: "Rate Class",
    Non_Drivable_Flag: "Non-Drivable Flag",
    Claimant_State: "Claimant State",
    Primary_Accident_Description: "Primary Accident Description"
  };

  // Data generator with new categories
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const generateData = () => {
      switch (selectedVariable) {
        case 'Initial_Class_of_Claim':
          return [
            { category: 'Bodily Injury', value: 62000 },
            { category: 'Property Damage', value: 48000 },
            { category: 'Comprehensive', value: 55000 },
          ];
        case 'Claimant_Injuries':
          return [
            { category: 'Minor', value: 35000 },
            { category: 'Moderate', value: 55000 },
            { category: 'Severe', value: 85000 },
            { category: 'None', value: 25000 },
          ];
        case 'Repairable_Flag':
          return [
            { category: 'Yes', value: 48000 },
            { category: 'No', value: 68000 },
          ];
        case 'Initial_Attorney_Involvement':
          return [
            { category: 'Yes', value: 72000 },
            { category: 'No', value: 42000 },
          ];
        case 'Primary_Cause_of_Accident':
          return [
            { category: 'Rear-end Collision', value: 52000 },
            { category: 'Side-impact', value: 62000 },
            { category: 'Head-on', value: 78000 },
            { category: 'Rollover', value: 88000 },
          ];
        case 'Rate_Class':
          return [
            { category: 'Standard', value: 48000 },
            { category: 'High Risk', value: 68000 },
            { category: 'Preferred', value: 42000 },
          ];
        case 'Non_Drivable_Flag':
          return [
            { category: 'Yes', value: 72000 },
            { category: 'No', value: 45000 },
          ];
        case 'Claimant_State':
          return [
            { category: 'CA', value: 55000 },
            { category: 'TX', value: 48000 },
            { category: 'NY', value: 62000 },
            { category: 'FL', value: 52000 },
            { category: 'IL', value: 46000 },
          ];
        case 'Primary_Accident_Description':
          return [
            { category: 'Highway Accident', value: 62000 },
            { category: 'Intersection Collision', value: 55000 },
            { category: 'Parking Lot Incident', value: 45000 },
          ];
        default:
          return [{ category: 'Default', value: 50000 }];
      }
    };

    setGraphData(generateData());
  }, [selectedVariable]);

  // Determine bar colors based on variable
  const getBarColor = () => {
    const colorMap = {
      Initial_Class_of_Claim: ['#1890ff', '#52c41a', '#faad14'],
      Claimant_Injuries: ['#4e79a7', '#f28e2c', '#e15759', '#76b7b2'],
      Repairable_Flag: ['#52c41a', '#ff4d4f'],
      Initial_Attorney_Involvement: ['#1890ff', '#faad14'],
      Primary_Cause_of_Accident: ['#4e79a7', '#f28e2c', '#e15759', '#76b7b2'],
      Rate_Class: ['#52c41a', '#ff4d4f', '#1890ff'],
      Non_Drivable_Flag: ['#1890ff', '#faad14'],
      Claimant_State: ['#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#52c41a'],
      Primary_Accident_Description: ['#1890ff', '#52c41a', '#faad14']
    };

    return colorMap[selectedVariable] || ['#4e79a7'];
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <Title level={5} style={{ marginBottom: 16 }}>
        Select a Variable
        <Tooltip title="Variables related to the claim">
          <InfoCircleOutlined style={{ marginLeft: '8px', fontSize: '16px', color: '#1890ff' }} />
        </Tooltip>
      </Title>
      <Select
        style={{ width: '70%', boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)", marginBottom: 16 }}
        value={selectedVariable}
        onChange={setSelectedVariable}
        placeholder="Select a variable"
      >
        {Object.entries(variableMapping).map(([key, label]) => (
          <Option key={key} value={key}>{label}</Option>
        ))}
      </Select>

      {/* Graph card */}
      <Card style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
        <Title level={5}>
          Average Claim Cost by {variableMapping[selectedVariable]}
        </Title>
        <div style={{ width: '100%', height: 315 }}>
          <ResponsiveContainer>
            <BarChart
              data={graphData}
              margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="category" 
                label={{ 
                  value: variableMapping[selectedVariable], 
                  position: 'bottom', 
                  offset: 0 
                }}
              />
              <YAxis 
                label={{ 
                  value: 'Average Claim Cost', 
                  angle: -90, 
                  position: 'left' 
                }}
              />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Average Claim Cost']} />
              <Bar 
                dataKey="value" 
                fill={getBarColor()[0]}
                radius={[4, 4, 0, 0]}
              >
                {graphData.map((entry, index) => (
                  <rect 
                    key={`rect-${index}`} 
                    fill={getBarColor()[index % getBarColor().length]} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default RelationPlot;