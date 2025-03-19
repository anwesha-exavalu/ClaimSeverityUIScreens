import React from 'react';
import { Card, Row, Col, Typography, Statistic } from 'antd';
import FeatureImportanceChart from './MedicalChart';

const { Title, Paragraph } = Typography;

const OutputDetailsMedical = ({ predictionData }) => {
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
    marginTop:'10px',
    height: '58%',
    width:'201%'
  };
  const expCardStyle = {
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
    marginBottom: '10px',
    marginTop:'12px',
    height: '100%'
  };

  return (
    <div style={{ padding: '1%' }}>
      <Row gutter={[8, 8]}>
        {/* First row - Small cards and feature importance */}
        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Card style={smallCardStyle} bordered={true}>
            <Title level={4}>Predicted Class</Title>
            <Statistic 
              value={predictionData?.prediction ? predictionData.prediction.toFixed(2) : 0}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
          <Card style={mediumCardStyle} bordered={true}>
            <Title level={4}>Model Confidence</Title>
            <Row>
              <Col span={24}>
                <Paragraph>
                  <strong>Our model is accurate 99% of the time, helping detect fraud faster.</strong> 
                </Paragraph>
                <Paragraph>
                  <strong>The model catches 80 out of 100 fraud cases, reducing financial losses.</strong>
                </Paragraph>
              </Col>
            </Row>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Card style={smallCardStyle} bordered={true}>
            <Title level={4}>Claim Risk Score</Title>
            <Statistic 
              value="0"
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
            <Title level={4}>Expectations</Title>
            {/* Content for Expectations can be added here */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OutputDetailsMedical;