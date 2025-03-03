import React, { useState } from "react";
import { Button, Menu, Card, Row, Col, Tooltip, Typography, Select, message, Upload, Modal } from "antd";
import { DownloadOutlined, UploadOutlined, InfoCircleOutlined, BarChartOutlined } from "@ant-design/icons";
import * as XLSX from 'xlsx';
import ModelInfo from "./ModelInfo";
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
  const [isModalVisible, setIsModalVisible] = useState(false);
    
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
  
  // Responsive button style that adjusts based on screen size
  const buttonStyle = {
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
  
  // Modal handlers
  const showModal = () => {
    if (!uploadedFile) {
      message.warning('Please upload a file before prediction');
      return;
    }
    if (!selectedModel) {
      message.warning('Please select a model before prediction');
      return;
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  const handleDownloadPrediction = () => {
    // Logic to download prediction data
    message.success('Downloading predictions...');
    // Implement your download logic here
    setIsModalVisible(false);
  };
  
  return (
    <div style={{ padding: "3%", border: "1px solid #ccc", borderRadius: 10, background: "white", width: "100%", maxWidth: "100%",margin: '0', }}>
      <Row gutter={[24, 16]} justify="start" align="top">
        <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ justifyContent: 'start' }}>
          <Card style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
            <Title level={4} style={{ marginBottom: 16 }}>
              List of ML Model
              <Tooltip title="Choose a model to see available options">
                <InfoCircleOutlined style={{ marginLeft: '8px', fontSize: '16px', color: '#1890ff' }} />
              </Tooltip>
            </Title>
            <Select
              value={selectedModel}
              style={{ width: '100%', maxWidth: '400px', boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}
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
      
      <Row gutter={[16, 16]} justify="start" style={{ marginTop: 16 }}>
        <Col xs={24} sm={8} md={8} lg={8} xl={8} style={{ display: 'flex', justifyContent: 'start', marginBottom: '10px' }}>
          <Button 
            type="default" 
            icon={<DownloadOutlined />} 
            onClick={handleDownload}
            size="large"
            style={{ ...buttonStyle, width: '100%', maxWidth: '250px' }}
          >
            Download Sample File
          </Button>
        </Col>
        <Col xs={24} sm={8} md={8} lg={8} xl={8} style={{ display: 'flex', justifyContent: 'start', marginBottom: '10px' }}>
          <Upload {...uploadProps}>
            <Button 
              type="default" 
              icon={<UploadOutlined />}
              size="large"
              style={{ ...buttonStyle, width: '100%', maxWidth: '250px' }}
            >
              Upload File
            </Button>
          </Upload>
        </Col>
        <Col xs={24} sm={8} md={8} lg={8} xl={8} style={{ display: 'flex', justifyContent: 'start', marginBottom: '10px' }}>
          <Button 
            type="primary" 
            icon={<BarChartOutlined />}
            size="large"
            onClick={showModal}
            style={{ ...buttonStyle, width: '100%', maxWidth: '250px' }}
          >
            Predict
          </Button>
        </Col>
      </Row>
      
      {/* Prediction Modal */}
      <Modal
        title={`${selectedModel || 'Model'} Prediction Results`}
        visible={isModalVisible}
        onCancel={handleCancel}
        width="90%"
        style={{ maxWidth: '1000px' }}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button 
            key="download" 
            type="primary" 
            icon={<DownloadOutlined />} 
            onClick={handleDownloadPrediction}
          >
            Download Prediction
          </Button>
        ]}
      >
        <ModelInfo />
      </Modal>
    </div>
  );
};

export default BatchInference;