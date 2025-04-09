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
  Statistic,
  Table,
  Tag,
  Modal,
  Upload,
  message
} from "antd";
import { DownloadOutlined, UploadOutlined, InfoCircleOutlined, DollarOutlined, EyeOutlined, StarFilled, SaveOutlined } from "@ant-design/icons";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import * as XLSX from 'xlsx';
import ClaimAnalysisGraph from "./ClaimAnalysisGraph";
import LossExposureHistogram from "./LossExposureHistogram";
import FeatureWeightsTable from "./FeatureweightTable";

const { Option } = Select;
const { Title, Text } = Typography;
const { Content } = Layout;

const modelDescriptions = {
  "Claim Propensity": "Predicts the likelihood of a claim being filed.",
  "Claim severity - Third party auto liability (FNOL)": "Estimates the potential cost of a claim.",
  "Medical Invoice Analysis - Workers Compensation": "Medical Invoice Analysis - Workers Compensation for Workers' compensation claims."
};

const ClaimSeverityUI = ({ predictionData }) => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isTraining, setIsTraining] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [currentModel, setCurrentModel] = useState(null);
  const [selectedModelForSave, setSelectedModelForSave] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);

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
    // Simulate starting training
    setIsTraining(true);
    setTimeout(() => {
      setIsTraining(false);
      setShowTable(true);
    }, 2000);
  };
  const handleViewInsights = (record) => {
    setCurrentModel(record);
    setIsModalVisible(true);
  };
  const handleSaveModel = () => {
    if (!selectedModelForSave) {
      message.error('Please select a model to save');
      return;
    }

    // Here you would typically save the selected model to use in another screen
    message.success(`Model ${selectedModelForSave} saved successfully!`);
    // You could also store this in localStorage, Redux store, or context for use in other screens
    localStorage.setItem('savedModel', selectedModelForSave);
  };
  // const handleTarget = () => {
  //   if (!selectedTarget) {
  //     message.error('Please select a model to save');
  //     return;
  //   }

  //   // Here you would typically save the selected model to use in another screen
  //   message.success(`Target ${selectedTarget} saved successfully!`);
  //   // You could also store this in localStorage, Redux store, or context for use in other screens
  //   localStorage.setItem('savedModel', selectedTarget);
  // };
  const target= [
    {
      key: '1',
      targetName: 'Initial Class of Claim',
      
    },
    {
      key: '2',
      targetName: 'Claimant Injuries',
      
    },
    {
      key: '3',
      targetName: 'Repairable Flag',
      
    },
    {
      key: '4',
      targetName: 'Primary Cause of Accident',
      
    },
    {
      key: '5',
      targetName: 'Rate Class',
      
    },
    {
      key: '6',
      targetName: 'Non Drivable Flag',
      
    },
    {
      key: '7',
      targetName: 'Claimant State',
      
    },
    {
      key: '8',
      targetName: 'Primary Accident Description',
      
    },
    {
      key: '9',
      targetName: 'Claim Cost',
      
    },

  ]
  const models = [
    {
      key: '1',
      modelName: 'autopilot-job-1743592164',
      algorithm: 'XGBoost',
      trainingStartTime: '2025-04-02 16:39',
      trainingEndTime: '2025-04-02 17:41',
      mae: '29,400',
      rmse: '15.6M',
      r2: '0.58',
      status: 'Completed',
      bestModel: true,
    },
    {
      key: '2',
      modelName: 'autopilot-job-1743105119',
      algorithm: 'LinearLearner',
      trainingStartTime: '2025-04-01 13:10',
      trainingEndTime: '2025-04-01 13:49',
      mae: '31,200',
      rmse: '16.1M',
      r2: '0.55',
      status: 'Completed',
      bestModel: false,
    },
    {
      key: '3',
      modelName: 'autopilot-job-1742201152',
      algorithm: 'CatBoost',
      trainingStartTime: '2025-03-30 10:05',
      trainingEndTime: '2025-03-30 10:41',
      mae: '29,900',
      rmse: '15.9M',
      r2: '0.56',
      status: 'Completed',
      bestModel: false,
    },
    {
      key: '4',
      modelName: 'autopilot-job-1741028271',
      algorithm: 'RandomForest',
      trainingStartTime: '2025-03-28 11:30',
      trainingEndTime: '2025-03-28 12:18',
      mae: '30,80',
      rmse: '16.3M',
      r2: '0.53',
      status: 'Completed',
      bestModel: false,
    },
  ];
  const columnsTable = [
    // {
    //   title: 'Model Name',
    //   dataIndex: 'modelName',
    //   key: 'modelName',
    //   render: (text) => <Text code>{text}</Text>,
    // },
    {
      title: 'Algorithm',
      dataIndex: 'algorithm',
      key: 'algorithm',
    },
    {
      title: 'Training Start Time',
      dataIndex: 'trainingStartTime',
      key: 'trainingStartTime',
    },
    {
      title: 'Training End Time',
      dataIndex: 'trainingEndTime',
      key: 'trainingEndTime',
    },
    {
      title: 'MAE',
      dataIndex: 'mae',
      key: 'mae',
    },
    // {
    //   title: 'RMSE',
    //   dataIndex: 'rmse',
    //   key: 'rmse',
    // },
    {
      title: 'R²',
      dataIndex: 'r2',
      key: 'r2',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color="green">✅ {status}</Tag>
      ),
    },
    {
      title: 'Best Model',
      dataIndex: 'bestModel',
      key: 'bestModel',
      render: (isBest) => (
        isBest ? <Text strong style={{ color: '#faad14' }}><StarFilled /> Yes</Text> : 'No'
      ),
    },
    {
      title: 'View Insights',
      key: 'viewInsights',
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => handleViewInsights(record)}
        >
          View
        </Button>
      ),
    },
  ];

  // Shared card styling for consistency
  const cardStyle = {
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
    height: "100%",
    width: "100%",
    marginBottom: "1rem"

  };

  // Statistics card styling
  const statsCardStyle = {
    ...cardStyle,
    display: "flex",
    flexDirection: "column",
    marginTop: "1.5rem",
  };

  return (
    <Layout style={{ padding: "2.5%", background: "white" }}>
      <Content>
        {/* Top Row - Cards */}
        <Row justify="center">
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Card style={cardStyle}>
              <Title level={4} style={{ marginBottom: "1rem" }}>
                List of ML Model
                <Tooltip title="Choose a model to see available options">
                  <InfoCircleOutlined style={{ marginLeft: '8px', fontSize: '16px', color: '#1890ff' }} />
                </Tooltip>
              </Title>
              <Select
                value={selectedModel}
                style={{ width: '30%', minWidth: "200px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}
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
        <Row gutter={[16, 16]} justify="center" style={{ marginTop: "1rem" }}>
          {/* <Col xs={24} sm={8} md={8} lg={8} xl={8} className="text-center">
            <Button
              type="default"
              icon={<DownloadOutlined />}
              onClick={handleDownload}
              size="large"
              style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)", width: "100%", maxWidth: "200px" }}
            >
              Download Template
            </Button>
          </Col> */}
          <Col xs={24} sm={8} md={8} lg={8} xl={8} className="text-center">
            <Upload {...uploadProps}>
              <Button
                type="default"
                icon={<UploadOutlined />}
                size="large"
                style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)", width: "100%", maxWidth: "200px" }}
              >
                Upload Data
              </Button>
            </Upload>
          </Col>
          <Col xs={24} sm={8} md={8} lg={8} xl={8} className="text-center">
          <Select
              placeholder="Select a target variable"
              style={{ width: '300px' }}
              onChange={(value) => setSelectedTarget(value)}
            >
              {target.map(model => (
                <Option key={model.key} value={model.targetName}>
                  {model.targetName} 
                </Option>
              ))}
            </Select>
              </Col>
          <Col xs={24} sm={8} md={8} lg={8} xl={8} className="text-center">
            <Button
              type="primary"
              size="large"
              onClick={handleTrain}
              loading={isTraining}
              style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)", width: "100%", maxWidth: "200px" }}
            >
              Train Model
            </Button>
          </Col>
        </Row>

        {/* Alert for Errors */}
        <Row style={{ marginTop: "1rem" }}>
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
        {showTable && (
          <div style={{ overflowX: 'auto' }}>
            <Table
              columns={columnsTable}
              dataSource={models}
              pagination={false}
              bordered
              scroll={{ x: true }}
            />
          </div>
        )}
        {showTable && (
          <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Select
              placeholder="Select a model to save"
              style={{ width: '300px' }}
              onChange={(value) => setSelectedModelForSave(value)}
            >
              {models.map(model => (
                <Option key={model.key} value={model.modelName}>
                  {model.modelName} ({model.algorithm}) {model.bestModel && '⭐️'}
                </Option>
              ))}
            </Select>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSaveModel}
            >
              Save Selected Model
            </Button>
          </div>
        )}
        {/* Modal for Results */}
        <Modal
          title="Training Results"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          width="90%"
          style={{ maxWidth: "1400px" }}
          footer={null}
          bodyStyle={{ padding: "1.5rem" }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Card
                title="Actual vs. Predicted Claims"
                style={{ ...cardStyle, marginBottom: "1rem" }}
              >
                <div style={{ height: "500px", width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
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
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Card
                title="Relation plot of variables with claim cost"
                bordered={false}
                style={{ ...cardStyle, marginBottom: "1.2rem" }}
              >
                <div style={{ height: "500px", width: '100%' }}>
                  <ClaimAnalysisGraph />
                </div>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
                {/* First Card */}
                <Card style={{ ...statsCardStyle, flex: 1, minHeight: "220px" }}>
                  <Title level={4}>Metrics</Title>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Statistic
                        title="Average Claim Payout"
                        value="53,412"
                        prefix={<DollarOutlined />}
                        valueStyle={{ color: '#3f8600' }}
                      />
                      <Statistic
                        title="Mean Absolute Error"
                        value="4,130.50"
                        prefix={<DollarOutlined />}
                        valueStyle={{ color: 'crimson' }}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="R² Score"
                        value="0.72"
                      />
                    </Col>
                  </Row>
                </Card>

                {/* Second Card */}
                <Card style={{ ...statsCardStyle, flex: 1, minHeight: "220px" }}>
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <Statistic
                        title="Predicted Claim Amount"
                        value="42,041.63"
                        prefix={<DollarOutlined />}
                        valueStyle={{ color: '#3f8600' }}
                      />
                      <Statistic
                        title="Confidence Interval"
                        value="37911.13-46172.13"
                        prefix={<DollarOutlined />}
                        valueStyle={{ color: '#1f77b4' }}
                      />
                    </Col>
                  </Row>
                </Card>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Card
                title="Claim Amount plot with different frequencies"
                bordered={false}
                style={{ ...cardStyle, marginBottom: "1rem", }}
              >
                <div style={{ height: "450px", width: '100%' }}>
                  <LossExposureHistogram />
                </div>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: "1rem" }}>
            <Col span={24}>
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
                style={cardStyle}
              >
                <FeatureWeightsTable />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: "1rem" }}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="primary"
                size="large"
                onClick={handleTrain}
                style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}
              >
                Save & Publish
              </Button>
            </Col>
          </Row>
        </Modal>
      </Content>
    </Layout>
  );
};

export default ClaimSeverityUI;