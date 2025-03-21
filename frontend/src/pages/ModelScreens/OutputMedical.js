import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Statistic, Spin, Form } from 'antd';
import FeatureImportanceChart from './MedicalChart';

const { Title, Paragraph, Text } = Typography;
const removeParenthesesContent = (text) => text.replace(/\s*\(.*?\)/g, '');

const OutputDetailsMedical = ({ predictionData }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [form] = Form.useForm();
 const [policyNumber, setPolicyNumber] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");

      useEffect(() => {
        // Set loading to true while we fetch the data
        setLoading(true);
        
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

    return predictionData.top_5_shap_values.map(([name, value]) => ({
      feature: name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      value: Math.abs(value),
      actualValue: value
    }));
  };

  const getTopFeatures = () => {
    if (!predictionData || !predictionData.top_5_shap_values) {
      return { positiveFeatures: [], negativeFeatures: [] };
    }

    const positiveFeatures = predictionData.top_5_shap_values
      .filter(([_, value]) => value > 0)
      .map(([name, _]) => name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));

    const negativeFeatures = predictionData.top_5_shap_values
      .filter(([_, value]) => value < 0)
      .map(([name, _]) => name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));

    return { positiveFeatures, negativeFeatures };
  };

  const { positiveFeatures, negativeFeatures } = getTopFeatures();

  // Card styles based on the new layout
  const smallCardStyle = {
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
    marginBottom: '10px',
    height: '40%'
  };

  const bigCardStyle = {
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
    marginBottom: '10px',
    height: '100%'
  };
  const mediumCardStyle = {
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
    marginBottom: '10px',
    marginTop: '10px',
    height: '58%',
    width: '201%'
  };
  const expCardStyle = {
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
    marginBottom: '10px',
    marginTop: '12px',
    height: '100%'
  };

  // Get the prediction label and score from the predictionData if available
  const predictionLabel = predictionData?.predictions?.[0]?.Prediction_Label || "N/A";
  const predictionScore = predictionData?.predictions?.[0]?.Probability_Score || 0;

  return (
    <div style={{ padding: '1%' }}>
         <div className="policy-details-container">
         
            <Card>
              <Row gutter={[14, 14]} style={{ marginBottom: '24px', width: '100%' }}>
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
              <Row gutter={[14, 14]} style={{ marginBottom: '24px', width: '100%' }}>
                <Col xs={24} sm={12} md={6} lg={6}>
                  <Title level={5} style={{ color: 'royalblue', marginBottom: 14 }}>
                    LOB - Worker's Compensation
                  </Title>
                </Col>
                <Col xs={24} sm={12} md={6} lg={6}>
                  <Title level={5} style={{ color: 'royalblue', marginBottom: 14 }}>
                    Model Name - Medical Invoice Analysis
                  </Title>
                </Col>
              </Row>
            </Card> 
          
        </div>
      <Row gutter={[8, 8]}>
        {/* First row - Small cards and feature importance */}
        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Card style={smallCardStyle} bordered={true}>
            <Title level={4}>Model Prediction</Title>
            <Statistic
              value={predictionLabel}
              valueStyle={{ color: predictionLabel === "Fraud" ? 'crimson' : 'red' }}
            />
          </Card>
          <Card style={mediumCardStyle} bordered={true}>
            <Title level={4}>Model Confidence</Title>
            <Row>
              <Col span={24}>
                <Paragraph>
                  <strong>Captures 80% of anomalies</strong>
                </Paragraph>
                <Paragraph>
                  <strong>99% accurate in identifying true anomalies</strong>
                </Paragraph>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Card style={smallCardStyle} bordered={true}>
            <Title level={4}>Claim Risk Score</Title>
            <Statistic
              value={predictionScore ? (predictionScore * 100).toFixed(2) + "%" : "0"}
              valueStyle={{ color: 'crimson' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card style={bigCardStyle} bordered={true}>
            <div style={{ textAlign: 'center' }}>
              <Title level={4}>Key Factors Behind Prediction</Title>
              <FeatureImportanceChart />
            </div>
          </Card>
        </Col>
      </Row>



      {/* Third row - Expectations */}
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Card style={expCardStyle} bordered={true}>
            <Title level={5}>Explanation of Feature Impact</Title>
            {predictionData?.explanation?.indicators ? (
              <div>
                <Text strong>{removeParenthesesContent(predictionData.explanation.title)}</Text>
                {predictionData.explanation.indicators.map((indicator, index) => (
                  <div key={index} style={{ marginBottom: '5px' }}>
                    <Text strong>{removeParenthesesContent(indicator.feature)}</Text>
                    <Paragraph>{indicator.explanation}</Paragraph>
                    <Text type="secondary">Risk Level: {indicator.risk_level}</Text>
                  </div>
                ))}
              </div>
            ) : (
              <Paragraph>No explanation data available.</Paragraph>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OutputDetailsMedical;