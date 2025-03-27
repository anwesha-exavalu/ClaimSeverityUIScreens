import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Typography, Statistic, Tooltip } from 'antd';
import { InfoCircleOutlined, DollarOutlined } from '@ant-design/icons';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import FeatureWeightsTable from './FeatureweightTable';
import RelationPlot from './RelationPlot';

const { Title, Text } = Typography;

const ModelInfo = ({ predictionData }) => {
  const [policyNumber, setPolicyNumber] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [selectedModel, setSelectedModel] = useState('');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    // Retrieve data from localStorage
    const storedPolicyNumber = localStorage.getItem('currentPolicyNumber');
    const storedCustomerId = localStorage.getItem('currentCustomerId');
    const storedFirstName = localStorage.getItem('currentCustomerFirstName');
    const storedLastName = localStorage.getItem('currentCustomerLastName');
    const model = localStorage.getItem('selectedModel');

    // Update state with retrieved values
    if (storedPolicyNumber) setPolicyNumber(storedPolicyNumber);
    if (storedCustomerId) setCustomerId(storedCustomerId);
    if (storedFirstName) setCustomerFirstName(storedFirstName);
    if (storedLastName) setCustomerLastName(storedLastName);
    if (model) setSelectedModel(model);

    // Add event listener for window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Feature weights data based on model coefficients
  const getFeatureWeights = () => {
    if (!predictionData || !predictionData.model_weights || !predictionData.model_weights.coefficients) {
      return [];
    }

    const { coefficients } = predictionData.model_weights;

    // Create a data source from the coefficients
    return Object.entries(coefficients)
      .map(([feature, value]) => {
        // Format feature name (convert snake_case to Title Case)
        const formattedFeature = feature.split('_').map(word =>
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');

        // Generate explanations based on the coefficient value
        let explanation = '';
        if (value > 3000) {
          explanation = `More Significant, Increases claim cost.`;
        }
        else if (value > 0 && value < 3000) {
          explanation = `Moderately Significant, Increases claim cost.`;
        }
        else {
          explanation = `Significant, Decreases claim cost.`;
        }

        return {
          key: feature,
          feature: formattedFeature,
          weight: value,
          explanation: explanation
        };
      })
      .sort((a, b) => Math.abs(b.weight) - Math.abs(a.weight))
      .slice(0, 5)
      .map((item, index) => ({
        ...item,
        key: (index + 1).toString()
      }));
  };

  // Generate data from the actual vs predicted JSON
  const generateData = () => {
    if (!predictionData || !predictionData.all_actual_vs_predicted) {
      return [];
    }

    return Object.entries(predictionData.all_actual_vs_predicted).map(([actual, predicted]) => ({
      actual: parseFloat(actual),
      predicted: predicted
    }));
  };
  // Tooltip styles
  const tooltipStyle = {
    backgroundColor: '#e6f7ff',
    color: '#0050b3',
    padding: '8px 12px',
    borderRadius: '4px',
    maxWidth: '300px'
  };

  // Responsive font sizes based on screen width
  const getTitleFontSize = () => {
    if (windowWidth < 576) return '18px';
    if (windowWidth < 992) return '20px';
    return '24px';
  };

  const getSubtitleFontSize = () => {
    if (windowWidth < 576) return '16px';
    if (windowWidth < 992) return '18px';
    return '20px';
  };

  const getStatFontSize = () => {
    if (windowWidth < 576) return '20px';
    if (windowWidth < 992) return '24px';
    return '28px';
  };

  // Responsive chart height
  const getChartHeight = () => {
    if (windowWidth < 576) return 300;
    if (windowWidth < 992) return 350;
    return 600;
  };

  // Columns for feature weights table
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
      render: (text) => `${text.toFixed(2)}`,
    },
    {
      title: 'Explanation',
      dataIndex: 'explanation',
      key: 'explanation',
    },
  ];

  // Prepare data for scatter plot and other components
  const data = generateData();

  // Calculate consistent domain for both axes to match the image
  const calculateConsistentDomain = () => {
    return [0, 600000];
  };

  const consistentDomain = calculateConsistentDomain();

  // Helper function to format numbers in millions
  const formatMillions = (value) => {
    return `${(value / 1000000).toFixed(1)}M`;
  };

  // Create ticks for X and Y axes
  const axisTicks = [0, 100000, 200000, 300000, 400000, 500000, 600000];

  const featureWeights = getFeatureWeights();

  return (
    <div className="model-info-container" style={{ padding: '24px', width: '100%' }}>
      {/* Customer Details Container */}

      <Row gutter={[16, 16]}>
        {/* Left Column - Account Information */}
        <Col xs={24} sm={12}>
          <Card
            type="inner"
            title="Customer Details"
            headStyle={{
              backgroundColor: '#f5f5f5',
              fontWeight: 600
            }}
            style={{ height: '230px', boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)", }}
          >
            <div className="space-y-3">
              <div className="grid grid-cols-2 items-center">
                <Text type="secondary" className="justify-self-start">Policy Number  -  </Text>
                <Text strong className="justify-self-end">{policyNumber}</Text>
              </div>
              <div className="grid grid-cols-2 items-center">
                <Text type="secondary" className="justify-self-start">Customer ID  -  </Text>
                <Text strong className="justify-self-end">{customerId}</Text>
              </div>
              <div className="grid grid-cols-2 items-center">
                <Text type="secondary" className="justify-self-start"> Customer Name  -  </Text>
                <Text strong className="justify-self-end">{customerFirstName} {customerLastName}</Text>
              </div>
              <div className="grid grid-cols-2 items-center">
                <Text type="secondary" className="justify-self-start">LOB  -  </Text>
                <Text strong className="justify-self-end"> Auto Liability</Text>
              </div>
              <div className="grid grid-cols-2 items-center">
                <Text type="secondary" className="justify-self-start"> Model Name  -  </Text>
                <Text strong className="justify-self-end">Claim severity - Third party auto liability (FNOL)</Text>
              </div>
              <div className="grid grid-cols-2 items-center">
                <Text type="secondary" className="justify-self-start">Date of Loss  -  </Text>
                <Text strong className="justify-self-end">01/03/2025</Text>
              </div>
            </div>
          </Card>
        </Col>

        {/* Right Column - Organization Information */}
        <Col xs={24} sm={12}>
          <Card
            type="inner"
            title="Vehicle Details"
            headStyle={{
              backgroundColor: '#f5f5f5',
              fontWeight: 600
            }}
            style={{ height: '230px', boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)", }}
          >
            <div className="space-y-3">
              <div className="grid grid-cols-2 items-center">
                <Text type="secondary" className="justify-self-start">Maker - </Text>
                <Text strong className="justify-self-end">Ford</Text>
              </div>
              <div className="grid grid-cols-2 items-center">
                <Text type="secondary" className="justify-self-start">Model -</Text>
                <Text strong className="justify-self-end">Raptor</Text>
              </div>
              <div className="grid grid-cols-2 items-center">
                <Text type="secondary" className="justify-self-start">Model Year - </Text>
                <Text strong className="justify-self-end">12/25/2024</Text>
              </div>

            </div>
          </Card>
        </Col>
      </Row>

      {/* <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-3">Customer Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600"> Policy Number - </span>
              <span className="font-semibold text-gray-800">{policyNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600"> Customer ID - </span>
              <span className="font-semibold text-gray-800">{customerId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Customer Name - </span>
              <span className="font-semibold text-gray-800">{customerFirstName} {customerLastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600"> LOB - </span>
              <span className="font-semibold text-gray-800">Auto Liability</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600"> Model Name - Claim severity - </span>
              <span className="font-semibold text-gray-800">Third party auto liability (FNOL)</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Date of Loss -  </span>
              <span className="font-semibold text-gray-800">01/03/2025</span>
            </div>
          </div>
        </div>

       
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-3">Organization Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Organization Type:</span>
              <span className="font-semibold text-gray-800">Business</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Industry Code:</span>
              <span className="font-semibold text-gray-800">243107</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Status:</span>
              <span className="font-semibold text-green-600">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Email Address:</span>
              <span className="font-semibold text-gray-800">skylineprop@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div> */}
      {/* Scatter Plot */}
      {selectedModel && (
        <Title level={3} style={{ marginBottom: '5px', color: 'royalblue', textAlign: "center", fontSize: getTitleFontSize() }}>
          Linear Regression of {selectedModel} Model
        </Title>
      )}
      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col xs={24} sm={12}>
          <Card style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
            <Title level={4} style={{ fontSize: getSubtitleFontSize() }}>Actual vs. Predicted Claims</Title>
            <div style={{ width: '100%', height: getChartHeight() }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{
                    top: 20,
                    right: windowWidth < 576 ? 1 : 2,
                    bottom: windowWidth < 576 ? 60 : 50,
                    left: windowWidth < 576 ? 40 : 50,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    dataKey="actual"
                    name="Actual Claim Cost"
                    domain={consistentDomain}
                    ticks={axisTicks}
                    label={{
                      value: 'Actual Claim Cost',
                      position: 'bottom',
                      offset: windowWidth < 576 ? 30 : 35,
                      style: { fontSize: windowWidth < 576 ? '12px' : '14px' }
                    }}
                    tickFormatter={formatMillions}
                    tick={{ fontSize: windowWidth < 576 ? 10 : 12 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="predicted"
                    name="Predicted Claim Cost"
                    domain={consistentDomain}
                    ticks={axisTicks}
                    label={{
                      value: 'Predicted Claim Cost',
                      angle: -90,
                      position: 'left',
                      offset: windowWidth < 576 ? 25 : 35,
                      style: { fontSize: windowWidth < 576 ? '12px' : '14px' }
                    }}
                    tickFormatter={formatMillions}
                    tick={{ fontSize: windowWidth < 576 ? 10 : 12 }}
                  />
                  <RechartsTooltip
                    formatter={(value) => `$${value.toLocaleString()}`}
                    labelFormatter={(value) => `Actual: $${value.toLocaleString()}`}
                  />
                  {/* Diagonal reference line (x=y) */}
                  <ReferenceLine
                    segment={[
                      { x: consistentDomain[0], y: consistentDomain[0] },
                      { x: consistentDomain[1], y: consistentDomain[1] }
                    ]}
                    stroke="red"
                    strokeDasharray="3 3"
                  />
                  <Scatter
                    data={data}
                    fill="#1890ff"
                    stroke="white"
                    strokeWidth={0.3}
                    opacity={0.8}

                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)", height: '100%' }}>
            <Title level={4} style={{ fontSize: getSubtitleFontSize() }}>Relation plot of variables with claim cost</Title>
            {/* Add your content for the second card here */}
            <div style={{ minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <RelationPlot />
            </div>
          </Card>
        </Col>
      </Row>
      {/* Statistics Cards */}
      <div style={{
        backgroundColor: '#fff',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '24px'
      }}>
        <div style={{
          borderBottom: '1px solid #f0f0f0',
          marginBottom: '16px',
          paddingBottom: '8px'
        }}>
          <Title level={4} style={{ color: 'royalblue', marginBottom: 14, }}>Metrics Values</Title>
        </div>
        <Row gutter={[16, 16]} style={{ marginTop: '16px' }} >

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
              <Title level={4} style={{ fontSize: getSubtitleFontSize() }}>
                R² Score
                <Tooltip
                  title="Measures how accurately the model explains variations in claim payouts, indicating its reliability in predicting losses (Ranges 0 to 1)."
                  overlayStyle={tooltipStyle}
                >
                  <InfoCircleOutlined style={{ marginLeft: '8px', fontSize: windowWidth < 576 ? '14px' : '16px', color: '#1890ff' }} />
                </Tooltip>
              </Title>
              <Statistic
                value={predictionData?.adjusted_r2 ? predictionData.adjusted_r2.toFixed(2) : 0}
                valueStyle={{ fontSize: getStatFontSize() }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
              <Title level={4} style={{ fontSize: getSubtitleFontSize() }}>
                Average Claim Amount
                <Tooltip
                  title="Average of the claim amount."
                  overlayStyle={tooltipStyle}
                >
                  <InfoCircleOutlined style={{ marginLeft: '8px', fontSize: windowWidth < 576 ? '14px' : '16px', color: '#1890ff' }} />
                </Tooltip>
              </Title>
              <Statistic
                value="62887.6"
                prefix={<DollarOutlined />}
                valueStyle={{ color: '#3f8600', fontSize: getStatFontSize() }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
              <Title level={4} style={{ fontSize: getSubtitleFontSize() }}>
                Mean Absolute Error
                <Tooltip
                  title="Measures the average difference between the model's predicted claim payouts and the actual payouts, showing the typical error in predictions."
                  overlayStyle={tooltipStyle}
                >
                  <InfoCircleOutlined style={{ marginLeft: '8px', fontSize: windowWidth < 576 ? '14px' : '16px', color: '#1890ff' }} />
                </Tooltip>
              </Title>
              <Statistic
                value={predictionData?.mae ? predictionData.mae.toFixed(2) : 0}
                prefix={<DollarOutlined />}
                valueStyle={{ color: 'crimson', fontSize: getStatFontSize() }}
              />
            </Card>
          </Col>
        </Row>
      </div>
      {/* Feature Weights Table */}
      {/* <Row style={{ marginTop: '16px' }}>
        <Col span={24}>
          <Card style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
            <Title level={4} style={{ fontSize: getSubtitleFontSize() }}>
              Feature Weights
              <Tooltip 
                title="Feature weights show the relative importance of each feature in making predictions. Higher values indicate stronger influence on the model's output."
                overlayStyle={tooltipStyle}
              >
                <InfoCircleOutlined style={{ marginLeft: '8px', fontSize: windowWidth < 576 ? '14px' : '16px', color: '#1890ff' }} />
              </Tooltip>
            </Title>
            <div className="table-responsive" style={{ overflowX: 'auto', width: '100%' }}>
              <Table 
                columns={columns} 
                dataSource={featureWeights} 
                pagination={false} 
              />
            </div>
          </Card>
        </Col>
      </Row> */}
    </div>
  );
};

export default ModelInfo;