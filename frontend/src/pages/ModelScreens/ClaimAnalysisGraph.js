import React, { useState, useEffect } from 'react';
import { Select, Card, Typography } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {InfoCircleOutlined } from "@ant-design/icons";
const { Option } = Select;
const { Title } = Typography;

const ClaimAnalysisGraph = () => {
  const [selectedVariable, setSelectedVariable] = useState('driver_gender');
  const [graphData, setGraphData] = useState([]);

  // Variable mapping for human-readable labels
  const variableMapping = {
    weather_conditions: "Weather Conditions",
    road_conditions: "Road Conditions",
    accident_severity: "Accident Severity",
    vehicle_make: "Vehicle Make",
    vehicle_model: "Vehicle Model",
    vehicle_year: "Vehicle Year",
    driver_age: "Driver Age",
    driver_gender: "Driver Gender",
    driver_experience_years: "Driver Experience (Years)",
    driver_history: "Driver History",
    passenger_count: "Passenger Count",
    claimant_age: "Claimant Age",
    claimant_gender: "Claimant Gender",
    claimant_occupation: "Claimant Occupation",
    pre_existing_conditions: "Pre-existing Conditions",
    injury_type: "Injury Type",
    injury_severity: "Injury Severity",
    initial_medical_expenses: "Initial Medical Expenses",
    ongoing_medical_expenses: "Ongoing Medical Expenses",
    long_term_care_costs: "Long-term Care Costs",
    policy_coverage_limits: "Policy Coverage Limits",
    policy_deductible: "Policy Deductible"
  };

  // Sample data generator - In a real application, this would be replaced with API calls
  useEffect(() => {
    // Generate mock data based on selected variable
    const generateData = () => {
      switch (selectedVariable) {
        case 'driver_gender':
          return [
            { category: 'Female', value: 52000 },
            { category: 'Male', value: 54000 },
          ];
          case 'claimant_gender':
          return [
            { category: 'Female', value: 64000 },
            { category: 'Male', value: 54000 },
          ];
        case 'weather_conditions':
          return [
            { category: 'Clear', value: 48000 },
            { category: 'Rain', value: 56000 },
            { category: 'Snow', value: 64000 },
            { category: 'Fog', value: 60000 },
          ];
          case 'accident_severity':
          return [
            { category: 'Less', value: 35000 },
            { category: 'Moderate', value: 56000 },
            { category: 'More', value: 48000 },
           
          ];
        case 'vehicle_make':
          return [
            { category: 'Toyota', value: 47000 },
            { category: 'Honda', value: 45000 },
            { category: 'Ford', value: 51000 },
            { category: 'BMW', value: 65000 },
            { category: 'Mercedes', value: 68000 },
          ];
        case 'injury_severity':
          return [
            { category: 'Minor', value: 32000 },
            { category: 'Moderate', value: 58000 },
            { category: 'Severe', value: 87000 },
          ];
        // Add other cases for each variable
        default:
          // Generate random data for other variables
          const categories = ['Category A', 'Category B', 'Category C'];
          return categories.map(category => ({
            category,
            value: Math.floor(Math.random() * 50000) + 30000
          }));
      }
    };

    setGraphData(generateData());
  }, [selectedVariable]);

  // Determine bar colors based on variable
  const getBarColor = () => {
    const colorMap = {
      driver_gender: ['#0052cc', '#ff69b4'],
      claimant_gender: ['#0052cc', '#ff69b4'],
      weather_conditions: ['#4e79a7', '#59a14f', '#9c755f', '#bab0ac'],
      vehicle_make: ['#e15759', '#76b7b2', '#edc949', '#af7aa1', '#ff9da7'],
      accident_severity: ['#e15759', '#76b7b2', '#edc949'],
      injury_severity: ['#4e79a7', '#f28e2c', '#e15759']
    };

    return colorMap[selectedVariable] || ['#4e79a7'];
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      {/* Dropdown for variable selection */}
     
     <Title level={5} style={{ marginBottom: 16 }}>
                Select a Variable
                <Tooltip title="Variables related to the claim">
                  <InfoCircleOutlined style={{ marginLeft: '8px', fontSize: '16px', color: '#1890ff' }} />
                </Tooltip>
              </Title>
      <Select
       style={{ width: '70%', boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}
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
              <Tooltip formatter={(value) => [`$${value}`, 'Average Claim Cost']} />
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

export default ClaimAnalysisGraph;