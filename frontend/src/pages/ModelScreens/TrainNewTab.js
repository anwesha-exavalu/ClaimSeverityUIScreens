import React, { useState } from "react";
import { 
  Button, 
  Select, 
  Card, 
  Layout, 
  Row, 
  Col, 
  Tooltip, 
  Typography, 
  Alert, 
  Table,
  Modal,
  Upload,
  message
} from "antd";
import { DownloadOutlined, UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import * as XLSX from 'xlsx';

const { Option } = Select;
const { Title } = Typography;
const { Content } = Layout;

const modelDescriptions = {
  "Claim Propensity": "Predicts the likelihood of a claim being filed.",
  "Claim Severity": "Estimates the potential cost of a claim.",
  "Medical Billing Fraud": "Detects fraudulent medical billing activities."
};

const ClaimSeverityUI = ({ predictionData }) => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const [selectedOption, setSelectedOption] = useState(null);
  
  const handleModelSelect = (value) => {
    setSelectedModel(value);
    setSelectedOption(null);
    localStorage.setItem('selectedModel', value);
  };
  const handleSelectChange = (value) => {
    setSelectedModel(value);
    localStorage.setItem('selectedModel', value);
  };

  const generateData = () => {
    const data = [];
    for (let i = 30000; i <= 80000; i += 2000) {
      const pointCount = Math.floor(Math.random() * 3) + 3;
      for (let j = 0; j < pointCount; j++) {
        const variance = (Math.random() - 0.5) * 10000;
        data.push({
          actual: i,
          predicted: i + variance
        });
      }
    }
    return data;
  };

  const data = generateData();

  const getFeatureWeights = () => {
    if (!predictionData || !predictionData.model_weights) return [];
    
    const { coefficients } = predictionData.model_weights;
    const weights = Object.entries(coefficients)
      .map(([feature, value]) => ({
        key: feature,
        feature: feature.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        weight: Math.abs(value),
        actualValue: value
      }))
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 5);
      
    const totalWeight = weights.reduce((sum, item) => sum + item.weight, 0);
    return weights.map((item, index) => ({
      ...item,
      key: (index + 1).toString(),
      weight: item.weight / totalWeight
    }));
  };

  const columns = [
    {
      title: 'Features',
      dataIndex: 'feature',
      key: 'feature',
    },
    {
      title: 'Values',
      dataIndex: 'weight',
      key: 'weight',
      render: (text) => `${(text * 100).toFixed(1)}%`,
    },
    {
      title: 'Explanation',
      dataIndex: 'explanation',
      key: 'explanation',
    },
  ];

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

  const handleTrain = () => {
    if (!selectedModel) {
      message.error('Please select a model first');
      return;
    }
    if (!uploadedFile) {
      message.error('Please upload training data first');
      return;
    }
    setIsModalVisible(true);
  };

  return (
    <Layout style={{ padding: 20, background: "white" }}>
      <Content>
        {/* Top Row - Cards */}
        {/* <Row gutter={[16, 16]} justify="space-around">
          <Col span={11}>
            <Card title="List of ML Model" bordered={false} style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)", height:"185px" }}>
              <Select
                value={selectedModel}
                style={{ width: '90%' }}
                onChange={handleSelectChange}
                placeholder="Select an ML Model"
              >
                {Object.keys(modelDescriptions).map((model) => (
                  <Option key={model} value={model}>
                    <Tooltip title={modelDescriptions[model]}>
                      {model}
                    </Tooltip>
                  </Option>
                ))}
              </Select>
            </Card>
          </Col>
          <Col span={11}>
            <Card title="Metrics" bordered={false} style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
              <div><p>R² Score: 72.23%</p>
              <p>Mean Absolute Error: 4130</p>
               </div>
            </Card>
          </Col>
        </Row> */}
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
        {/* Button Row */}
        <Row gutter={[16, 16]} justify="center" style={{ marginTop: 16 }}>
          <Col>
            <Button 
              type="default" 
              icon={<DownloadOutlined />} 
              onClick={handleDownload}
              size="large"
              style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}
            >
              Download Template
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
                Upload Data
              </Button>
            </Upload>
          </Col>
          <Col>
            <Button 
              type="primary" 
              size="large"
              onClick={handleTrain}
              style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}
            >
              Train Model
            </Button>
          </Col>
        </Row>

        {/* Alert for Errors */}
        <Row style={{ marginTop: 16 }}>
          <Col span={24}>
            <Alert
              message="Error"
              description="Error message (If any)"
              type="error"
              showIcon
              style={{ display: 'none' }} // Show when there's an error
            />
          </Col>
        </Row>

        {/* Modal for Results */}
        <Modal
          title="Training Results"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          width={1200}
          footer={null}
        >
         
            
              <Card title="Actual vs. Predicted Claims" style={{ marginBottom:'15px', boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
                <div style={{ height: 400, width:'100%' }}>
                  <ResponsiveContainer>
                    <ScatterChart
                      margin={{
                        top: 20,
                        right: 20,
                        bottom: 60,
                        left: 60,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        type="number"
                        dataKey="actual"
                        name="Actual Claim Cost"
                        domain={[30000, 80000]}
                        label={{ 
                          value: 'Actual Claim Cost',
                          position: 'bottom',
                          offset: 40
                        }}
                        tickFormatter={(value) => `${value.toLocaleString()}`}
                      />
                      <YAxis
                        type="number"
                        dataKey="predicted"
                        name="Predicted Claim Cost"
                        domain={[30000, 80000]}
                        label={{ 
                          value: 'Predicted Claim Cost',
                          angle: -90,
                          position: 'left',
                          offset: 40
                        }}
                        tickFormatter={(value) => `${value.toLocaleString()}`}
                      />
                      <RechartsTooltip 
                        formatter={(value) => `$${value.toLocaleString()}`}
                        labelFormatter={(value) => `Actual: $${value.toLocaleString()}`}
                      />
                      <ReferenceLine
                        segment={[
                          { x: 30000, y: 30000 },
                          { x: 80000, y: 80000 }
                        ]}
                        stroke="red"
                        strokeDasharray="3 3"
                      />
                      <Scatter
                        data={data}
                        fill="#1890ff"
                        opacity={0.6}
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </Card>
         
      
            <Row gutter={[11, 16]}>
            <Col span={8}>
            <Col span={12}>
            <Card title="Metrics" bordered={false} style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)", width: '350px' }}>
              <div><p>R² Score: 72.23%</p>
              <p>Mean Absolute Error: 4130</p>
               </div>
            </Card>
            </Col>
            <Col span={12}>
            <Button 
              type="primary" 
              size="large"
              onClick={handleTrain}
              style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)", marginTop: '100px' }}
            >
              Save & Publish
            </Button>
          </Col>
          </Col>
            <Col span={16}>
              <Card 
                title={
                  <span>
                    Feature Weights
                    <Tooltip 
                      title="Feature weights show the relative importance of each feature in making predictions"
                    >
                      <InfoCircleOutlined style={{ marginLeft: 8 }} />
                    </Tooltip>
                  </span>
                }
                style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}
              >
                <Table 
                  columns={columns} 
                  dataSource={getFeatureWeights()}
                  pagination={false}
                />
              </Card>
            </Col>
          </Row>
        </Modal>
      </Content>
    </Layout>
  );
};

export default ClaimSeverityUI;