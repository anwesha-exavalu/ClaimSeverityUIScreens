import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Statistic } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const OutputDetails = ({ predictionData }) => {
  const [policyNumber, setPolicyNumber] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  
  useEffect(() => {
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

  const formatShapData = () => {
    if (!predictionData || !predictionData.top_5_shap_values) {
      return [];
    }
    
    // Process top_5_shap_values which is now an array of arrays: [feature, value, shap_value]
    return predictionData.top_5_shap_values.map(shapItem => {
      const [feature, _, shapValue] = shapItem;
      
      // Format feature name without underscores, properly capitalized
      const formattedFeature = feature
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      return {
        feature: formattedFeature,
        value: Math.abs(shapValue),
        actualValue: shapValue
      };
    });
  };

  const getTopFeatures = () => {
    if (!predictionData || !predictionData.top_5_shap_values) {
      return { positiveFeatures: [], negativeFeatures: [] };
    }
    
    const positiveFeatures = predictionData.top_5_shap_values
      .filter(([_, __, shapValue]) => shapValue > 0)
      .map(([feature, _, __]) => feature
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '));
      
    const negativeFeatures = predictionData.top_5_shap_values
      .filter(([_, __, shapValue]) => shapValue < 0)
      .map(([feature, _, __]) => feature
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '));
      
    return { positiveFeatures, negativeFeatures };
  };

  const { positiveFeatures, negativeFeatures } = getTopFeatures();
  
  // Common card style to maintain consistency
  const cardStyle = {
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
    height: "100%",
    width: "100%"
  };

  return (
    <div style={{ padding: '2%' }}>
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
      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        {/* Left Column */}
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
            {/* First Card */}
            <Card style={cardStyle}>
              <Title level={4}>Predicted Claim Amount</Title>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Statistic 
                    title="Amount"
                    value={predictionData?.prediction ? predictionData.prediction.toFixed(2) : 0}
                    prefix={<DollarOutlined />}
                    valueStyle={{ color: '#3f8600' }}
                  />
                </Col>
              </Row>
            </Card>

            {/* Second Card */}
            <Card style={{ ...cardStyle, marginTop: '16px' }}>
              <Title level={4}>Confidence Interval</Title>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Statistic 
                    title="Predicted Claim Amount ± Mean Absolute Error"
                    value={predictionData?.prediction && predictionData?.mae ? 
                      `${(predictionData.prediction - predictionData.mae).toFixed(2)}-${(predictionData.prediction + predictionData.mae).toFixed(2)}` : 
                      "36575.31 - 90289.89"}
                    prefix={<DollarOutlined />}
                    valueStyle={{ color: '#1f77b4' }}
                  />
                </Col>
              </Row>
            </Card>
          </div>
        </Col>

        {/* Right Column - Bar Chart */}
        <Col xs={24} sm={24} md={12} lg={16} xl={16}>
          <Card style={cardStyle}>
            <Title level={4}>Feature Impact on Prediction (SHAP values)</Title>
            <div style={{ width: '100%', height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={formatShapData()}
                  margin={{ top: 8, right: 40, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    type="category" 
                    dataKey="feature" 
                    width={240}
                  />
                  <Tooltip 
                    formatter={(value, name, props) => [
                      `${props.payload.actualValue.toFixed(2)}`,
                      'Impact'
                    ]}
                  />
                  <Bar 
                    dataKey="actualValue" 
                    fill="#1890ff"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer> 
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card style={{ ...cardStyle, marginTop: '16px' }}>
            <Title level={4}>Inference</Title>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Title level={5}>Summary</Title>
                <ul>
                  {positiveFeatures.length > 0 && (
                    <li>
                      <Paragraph>
                        <strong>Factors increasing the claim amount:</strong> {positiveFeatures.join(', ')}
                      </Paragraph>
                    </li>
                  )}
                  {negativeFeatures.length > 0 && (
                    <li>
                      <Paragraph>
                        <strong>Factors decreasing the claim amount:</strong> {negativeFeatures.join(', ')}
                      </Paragraph>
                    </li>
                  )}
                </ul>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OutputDetails;