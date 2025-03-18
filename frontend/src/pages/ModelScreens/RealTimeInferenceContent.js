import React, { useState } from "react";
import {  Dropdown, Menu, Card, Row, Col, List, Tabs } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./Card.css";
import FeatureInputForm from "./FeatureInputForm";
import ModelInfo from "./ModelInfo";
import OutputDetails from "./Output";
import CustomerInfo from "./CustomerInfo";

const RealTimeInference = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [predictionData, setPredictionData] = useState(null);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  const [selectedOption, setSelectedOption] = useState("Claim Prosperity");

  const handleMenuClick = (e) => {
    setSelectedOption(e.key);
  };

  // const menu = (
  //   <Menu onClick={handleMenuClick}>
  //     <Menu.Item key="Claim Prosperity"></Menu.Item>
  //   </Menu>
  // );

  // const predictors = ["1)", "2)", "3)", "4)", "5)"];
  // const severity = "High"; // Example severity value (greater than 60%)
  // const onChange = (key) => {
  //   console.log(key);
  // };
  const items = [
    {
      key: '1',
      label: 'Customer Info',
      // children: <FeatureInputForm setActiveTab={setActiveTab} />,
      children: <CustomerInfo  setActiveTab={setActiveTab} />,
    },
    {
      key: '2',
      label: 'Feature Input',
     
      children: <FeatureInputForm setActiveTab={setActiveTab} setPredictionData={setPredictionData} />,
    },
    {
      key: '3',
      label: 'Model Info',
      children: <ModelInfo predictionData={predictionData} />,
    },
    {
      key: '4',
      label: 'Output',
      children: <OutputDetails predictionData={predictionData} />,
    },
  ];
  return (
    <div style={{ padding: 20, border: "1px solid #ccc", borderRadius: 10, background: "white" }}>
      <Tabs  activeKey={activeTab} onChange={handleTabChange}  items={items}  style={{fontWeight: 400}} />
      
      {/* <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={8}>
          <Dropdown overlay={menu} trigger={["click"]}>
            <Card hoverable style={{ height: 60, width: 300, cursor: "pointer", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", fontSize: "medium" }}>
              {selectedOption} <DownOutlined style={{ float: "right" }} />
            </Card>
          </Dropdown>

          <Row gutter={16} style={{ marginTop: 20 }}>
            <Col span={24}>
              <Card className="smallcard-value" 
                style={{ backgroundColor: severity=== "High" ? "#ffcccc" : "#ffffff" }}>
                <div className="card-title">Severity</div>
                <div className="card-content">High</div>
              </Card>
            </Col>
          </Row>

          <Row gutter={16} style={{ marginTop: 20 }}>
            <Col span={24}>
              <Card className="smallcard-value">
                <div className="card-title">Adj R2</div>
                <div className="card-content">90%</div>
              </Card>
            </Col>
          </Row>
        </Col>
        
        <Col span={10}>
          <Row gutter={16}>
            <Col span={18}>
              <Card className="bigcard-value" style={{ minHeight: predictors.length * 40 }}>
                <div className="card-title">Top Predictors</div>
                <List
                  dataSource={predictors}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card className="bigcard-value" style={{ height: "250px" }}>
                <div className="card-title">Anything Else</div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row> */}
    </div>
  );
};

export default RealTimeInference; 