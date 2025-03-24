import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Typography, Statistic, Tooltip } from 'antd';
import { InfoCircleOutlined, DollarOutlined } from '@ant-design/icons';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import FeatureWeightsTable from './FeatureweightTable';

const { Title } = Typography;

const ModelInfo = ({ predictionData }) => {
  const [policyNumber, setPolicyNumber] = useState("");
     const [customerId, setCustomerId] = useState("");
     const [customerFirstName, setCustomerFirstName] = useState("");
     const [customerLastName, setCustomerLastName] = useState("");
      useEffect(() => {
        // Set loading to true while we fetch the data
      
        
        // Retrieve data from localStorage
        const storedPolicyNumber = localStorage.getItem('currentPolicyNumber');
        const storedCustomerId = localStorage.getItem('currentCustomerId');
        const storedFirstName = localStorage.getItem('currentCustomerFirstName');
        const storedLastName = localStorage.getItem('currentCustomerLastName');
        
        // Update state with retrieved values
        if (storedPolicyNumber) setPolicyNumber(storedPolicyNumber);
        if (storedCustomerId) setCustomerId(storedCustomerId);
        if (storedFirstName) setCustomerFirstName(storedFirstName);
        if (storedLastName) setCustomerLastName(storedLastName);
        
        
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
        else if(value>0 && value<3000){
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

  // Tooltip styles
  const tooltipStyle = {
    backgroundColor: '#e6f7ff',
    color: '#0050b3',
    padding: '8px 12px',
    borderRadius: '4px',
    maxWidth: '300px'
  };
  
  const [selectedModel, setSelectedModel] = useState('');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  useEffect(() => {
    // Retrieve the selected model from localStorage when component mounts
    const model = localStorage.getItem('selectedModel');
    if (model) {
      setSelectedModel(model);
    }
    
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
    if (windowWidth < 576) return 250;
    if (windowWidth < 992) return 300;
    return 350;
  };
  
  return (
    <div className="model-info-container" style={{ padding: '24px', width: '100%' }}>
       <div className="policy-details-container">
                <Card>
                  <Row gutter={[40, 14]} justify="space-between" style={{ marginBottom: '24px', width: '100%' }}>
                    <Col xs={24} sm={12} md={6} lg={6}>
                      <Title level={5} style={{ color: 'royalblue', marginBottom: 14 }}>
                        Policy Number - {policyNumber}
                      </Title>
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                      <Title level={5} style={{ color: 'royalblue', marginBottom: 14 }}>
                        Customer ID - {customerId}
                      </Title>
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                      <Title level={5} style={{ color: 'royalblue', marginBottom: 14 }}>
                        Customer Name - {customerFirstName} {customerLastName}
                      </Title>
                    </Col>
                  </Row>
                  <Row gutter={[40, 14]} justify="space-between" style={{ marginBottom: '24px', width: '100%' }}>
                    <Col xs={24} sm={12} md={6} lg={6}>
                      <Title level={5} style={{ color: 'royalblue', marginBottom: 14 }}>
                        LOB - Auto Liability
                      </Title>
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                      <Title level={5} style={{ color: 'royalblue', marginBottom: 14 }}>
                        Model Name - Claim severity - Third party auto liability (FNOL)
                      </Title>
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                      <Title level={5} style={{ color: 'royalblue', marginBottom: 14 }}>
                        Date of Loss - 01/03/2025
                      </Title>
                    </Col>
                  </Row>
                </Card>
              </div>
      {/* Scatter Plot */}
      {selectedModel && (
        <Title level={3} style={{ marginBottom: '5px', color: 'royalblue', textAlign: "center", fontSize: getTitleFontSize() }}>
          Linear Regression of {selectedModel} Model
        </Title>
      )}
      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col span={24}>
          <Card style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
            <Title level={4} style={{ fontSize: getSubtitleFontSize() }}>Actual vs. Predicted Claims</Title>
            <div style={{ width: '100%', height: getChartHeight() }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{
                    top: 20,
                    right: windowWidth < 576 ? 10 : 20,
                    bottom: windowWidth < 576 ? 60 : 50,
                    left: windowWidth < 576 ? 40 : 50,
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
                      offset: windowWidth < 576 ? 30 : 35,
                      style: { fontSize: windowWidth < 576 ? '12px' : '14px' }
                    }}
                    tickFormatter={(value) => windowWidth < 576 ? `${(value/1000)}k` : `${value.toLocaleString()}`}
                    tick={{ fontSize: windowWidth < 576 ? 10 : 12 }}
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
                      offset: windowWidth < 576 ? 25 : 35,
                      style: { fontSize: windowWidth < 576 ? '12px' : '14px' }
                    }}
                    tickFormatter={(value) => windowWidth < 576 ? `${(value/1000)}k` : `${value.toLocaleString()}`}
                    tick={{ fontSize: windowWidth < 576 ? 10 : 12 }}
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
      </Row>

      {/* Statistics Cards - fixed to 3 cards per row regardless of screen size */}
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

      {/* Feature Weights Table */}
      <Row style={{ marginTop: '16px' }}>
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
              <FeatureWeightsTable />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ModelInfo;