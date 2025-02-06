import React from 'react';
import { Tabs } from 'antd';

import RadioButton from './RadioButton';
// import ModelManagement from './TrainNewTab';
import ClaimSeverityUI from './TrainNewTab';
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: 'Pre-Trained',
    children: <RadioButton/>,
  },
  {
    key: '2',
    label: 'Train New',
    children: < ClaimSeverityUI/>,
  },
//   {
//     key: '3',
//     label: 'Tab 3',
//     children: 'Content of Tab Pane 3',
//   },
];
const Tab = () => {

return(
<Tabs defaultActiveKey="1" items={items} onChange={onChange} style={{fontWeight: 400}} /> )};
export default Tab;