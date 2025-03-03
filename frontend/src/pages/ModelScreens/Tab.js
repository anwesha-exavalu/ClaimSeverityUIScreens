// Tab.js
import React, { useState, useEffect } from 'react';
import { Tabs, Typography } from 'antd';
import RadioButton from './RadioButton';
import ClaimSeverityUI from './TrainNewTab';

const { Title } = Typography;

const Tab = () => {
  // const [selectedModel, setSelectedModel] = useState('');

  // useEffect(() => {
  //   // Retrieve the selected model from localStorage when component mounts
  //   const model = localStorage.getItem('selectedModel');
  //   if (model) {
  //     setSelectedModel(model);
  //   }
  // }, []);

  // const onChange = (key) => {
  //   console.log(key);
  // };

  const items = [
    {
      key: '1',
      label: 'Pre-Trained',
      children: <RadioButton/>,
    },
    {
      key: '2',
      label: 'Train New',
      children: <ClaimSeverityUI/>,
    },
  ];

  return (
    <div>
      {/* {selectedModel && (
        <Title level={3} style={{ marginBottom: '5px', color: 'royalblue',  textAlign: "center" }}>
          {selectedModel} Model
        </Title>
      )} */}
     
      <Tabs 
        defaultActiveKey="1" 
        items={items} 
        // onChange={onChange} 
        style={{fontWeight: 400}} 
      />
    </div>
  );
};

export default Tab;