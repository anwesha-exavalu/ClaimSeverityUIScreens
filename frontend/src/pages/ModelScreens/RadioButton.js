import React, { useState } from "react";
import { 
  Select, 
  Radio, 
  Typography, 
  Layout, 
  Card, 
  Tooltip,
  Row,
  Col
} from "antd";
import ClaimSeverityUI from "./TrainNewTab";
import { InfoCircleOutlined } from "@ant-design/icons";
import RealTimeInference from "./RealTimeInferenceContent";
import BatchInference from "./BatchInference";
const { Option } = Select;
const { Title, Paragraph } = Typography;
const { Content } = Layout;

const modelDescriptions = {
  "Claim Propensity": "Predicts the likelihood of a claim being filed.",
  "Claim Severity": "Estimates the potential cost of a claim.",
  "Medical Billing Fraud": "Detects fraudulent medical billing activities."
};

const modelRadioOptions = {
  "Claim Propensity": [
    { label: "Real-time Risk Assessment", value: "real-time" },
    { label: "Batch Risk Prediction", value: "batch" }
  ],
  "Claim Severity": [
    { label: "Real Time Inference", value: "real-time" },
    { label: "Batch Inference", value: "batch" },
    
  ],
  "Medical Billing Fraud": [
    { label: "Real-time Fraud Detection", value: "real-time" },
    { label: "Batch Analysis", value: "batch" }
  ]
};

const RadioButton = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  
  const handleModelSelect = (value) => {
    setSelectedModel(value);
    setSelectedOption(null);
    localStorage.setItem('selectedModel', value);
  };

  const handleOptionSelect = (e) => {
    setSelectedOption(e.target.value);
  };

  const renderContent = () => {
    if (!selectedOption) return null;

  
    if (selectedModel === "Claim Severity" && selectedOption === "real-time") {
      return <RealTimeInference />;
    }
    else  if (selectedModel === "Claim Severity" && selectedOption === "batch") {
      return <BatchInference/>;
    }

    return (
      <Card style={{ marginTop: 16 }}>
        <Title level={4}>
          {selectedModel} - {selectedOption} Interface
        </Title>
        <Paragraph>
          Interface for {selectedOption} operations will be displayed here.
        </Paragraph>
      </Card>
    );
  };

  return (
    <Layout style={{ padding: 24, background: "white" }}>
      <Content>
       

        <Row justify="center">
          <Col span={24}>
            <Card style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)"}}>
              <Title level={4} style={{ marginBottom: 16 }}>
                List of ML Model
                <Tooltip title="Choose a model to see available options">
                  <InfoCircleOutlined style={{ marginLeft: '8px', fontSize: '16px', color: '#1890ff' }} />
                </Tooltip>
              </Title>
              <Select
                value={selectedModel}
                style={{ width: '30%', boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}
                onChange={handleModelSelect}
                placeholder="Select an ML Model"
              >
                {Object.keys(modelDescriptions).map((model) => (
                  <Option key={model} value={model}>
                    <Tooltip title={modelDescriptions[model]} placement="right">
                      {model}
                    </Tooltip>
                  </Option>
                ))}
              </Select>
            </Card>
          </Col>
        </Row>

        {selectedModel && (
          <>
            <Row justify="center" style={{ marginTop: 16 }}>
              <Col span={24}>
                <Card style={{marginBottom: '15px',  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)"}}>
                  {/* <Title level={3} style={{ color: 'royalblue', marginBottom: 24, textAlign: 'center' }}>
                    {selectedModel}
                  </Title>
                  <Paragraph style={{ textAlign: 'center', fontSize: '16px', marginBottom: 24 }}>
                    {modelDescriptions[selectedModel]}
                  </Paragraph> */}
                  <Title level={3} style={{ marginBottom: 10 }}>
                    Select Operation Mode
                  </Title>
                  
                  <Radio.Group
                    onChange={handleOptionSelect}
                    value={selectedOption}
                    style={{ marginBottom: 15, }}
                  >
                    
                    <Row gutter={[22, 22]} >
                      {modelRadioOptions[selectedModel].map(option => (
                       
                          <Radio
                            value={option.value}
                            style={{ 
                              gap:'1px',
                              textAlign: 'initial',
                              marginRight:'100px'
                            }}
                          >
                            {option.label}
                          </Radio>
                      
                      ))}
                    </Row>
                  </Radio.Group>
                </Card>
              </Col>
            </Row>
            
          </>
        )}

        {renderContent()}
      </Content>
    </Layout>
  );
};

export default RadioButton;