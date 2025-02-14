import React, { useState } from "react";
import { Select, Tooltip, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { Title, Paragraph } = Typography;

const modelDescriptions = {
  "Claim Propensity": "Predicts the likelihood of a claim being filed.",
  "Claim Severity": "Estimates the potential cost of a claim.",
  "Medical Billing Fraud": "Detects fraudulent medical billing activities."
};

const MLAppStore = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  const handleSelectChange = (value) => {
    setSelectedModel(value);
    setShowButton(true);
  };

  const handleNextClick = () => {
    navigate(`/model-details/${selectedModel.replace(/\s+/g, '-').toLowerCase()}`);
  };

  return (
    <div style={{ padding: "20px", height:"500px" }}>
      <Title level={3} style={{ color: "crimson", textAlign: "center" }}>
        Insurance ML App Store
      </Title>
      <Paragraph style={{fontSize: "18px"}}>
        Content1: Some background about the ML app store. How it can be used.
      </Paragraph>
      <Title level={4} style={{ color: "black" }}>List of ML Models</Title>
      <Select
        defaultValue={selectedModel}
        style={{ width: 250,  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}
        onChange={handleSelectChange}
        placeholder="Select an ML Model"
      >
        {Object.keys(modelDescriptions).map((model) => (
          <Option key={model} value={model}>
            <Tooltip title={modelDescriptions[model]} placement="right" style={{backgroundColor: "gray", color: "black"}}>
              {model}
            </Tooltip>
          </Option>
        ))}
      </Select>
      {showButton && (
        <Button type="primary" style={{ marginLeft: "10px", width: "100px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }} onClick={handleNextClick}>
          Next
        </Button>
      )}
    </div>
  );
};

export default MLAppStore;
