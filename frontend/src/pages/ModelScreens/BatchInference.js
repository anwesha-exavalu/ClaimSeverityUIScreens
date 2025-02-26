import React, { useState } from "react";
import { Button, Menu, Card, Row, Col, Tooltip, Typography, Select, message, Upload } from "antd";
import { DownloadOutlined, UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import * as XLSX from 'xlsx';
const { Option } = Select;
const { Title } = Typography;


const modelDescriptions = {
  "Claim Propensity": "Predicts the likelihood of a claim being filed.",
  "Claim Severity": "Estimates the potential cost of a claim.",
  "Medical Billing Fraud": "Detects fraudulent medical billing activities."
};

const BatchInference = () => {
  
  const [selectedModel, setSelectedModel] = useState(null);
   const [uploadedFile, setUploadedFile] = useState(null);
 
  
    const [selectedOption, setSelectedOption] = useState(null);
    
    const handleModelSelect = (value) => {
      setSelectedModel(value);
      setSelectedOption(null);
      localStorage.setItem('selectedModel', value);
    };
  const handleMenuClick = (e) => {
    setSelectedOption(e.key);
  };
   const menu = (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="Claim Prosperity">Claim Prosperity</Menu.Item>
      </Menu>
    );
  
  const buttonStyle = {
    height: 60,
    width: 250,
    fontSize: "medium",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
  };
  const handleDownload = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([{
      Date: '',
      ClaimAmount: '',
      InsuranceType: '',
      CustomerAge: '',
      PolicyDuration: ''
    }]);
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, 'claim_data_template.xlsx');
    message.success('Template downloaded successfully');
  };

  const uploadProps = {
    accept: '.xlsx, .xls',
    beforeUpload: (file) => {
      const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                      file.type === 'application/vnd.ms-excel';
      if (!isExcel) {
        message.error('You can only upload Excel files!');
        return false;
      }
      setUploadedFile(file);
      message.success(`${file.name} uploaded successfully`);
      return false;
    },
  };
  return (
    <div style={{ padding: 24, border: "1px solid #ccc", borderRadius: 10, background: "white" }}>
       <Row justify="center">
          <Col span={24}>
            <Card  style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
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
        <Row gutter={[16, 16]} justify="center" style={{ marginTop: 16 }}>
          <Col>
            <Button 
              type="default" 
              icon={<DownloadOutlined />} 
              onClick={handleDownload}
              size="large"
              style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}
            >
              Download Sample File
            </Button>
          </Col>
          <Col>
            <Upload {...uploadProps}>
              <Button 
                type="default" 
                icon={<UploadOutlined />}
                size="large"
                style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}
              >
                Upload File
              </Button>
            </Upload>
          </Col>
          <Col>
          <Button 
              type="primary" 
              size="large"
             
              style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}
            >
              Predict
            </Button>
           
          </Col>
          <Col>
          <Button 
              type="default" 
              icon={<DownloadOutlined />} 
              onClick={handleDownload}
              size="large"
              style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}
            >
              Download Predictions
            </Button>
          </Col>
        </Row>

         
    </div>
  );
};

export default BatchInference;
