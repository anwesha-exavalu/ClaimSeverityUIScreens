import React from 'react';
import { Card, Row, Col, Typography, Statistic } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const OutputDetails = ({ predictionData }) => {
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
      return "";
    }
    
    const positiveFeatures = predictionData.top_5_shap_values
      .filter(([_, value]) => value > 0)
      .map(([name, _]) => name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
      
    const negativeFeatures = predictionData.top_5_shap_values
      .filter(([_, value]) => value < 0)
      .map(([name, _]) => name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
      
    let summary = "";
    if (positiveFeatures.length > 0) {
      summary += `The main factors increasing the claim amount are: ${positiveFeatures.join(', ')}. `;
    }
    if (negativeFeatures.length > 0) {
      summary += `The main factors decreasing the claim amount are: ${negativeFeatures.join(', ')}.`;
    }
    
    return summary;
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        {/* Left Column */}
        <Col span={8}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* First Card */}
            <Card style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
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
            <Card style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
              <Title level={4}>Inference</Title>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Title level={5}>Summary</Title>
                  <Paragraph>
                    {getTopFeatures()}
                  </Paragraph>
                </Col>
              </Row>
            </Card>
          </div>
        </Col>

        {/* Right Column - Bar Chart */}
        <Col span={16}>
          <Card style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
            <Title level={4}>Feature Impact on Prediction (SHAP values)</Title>
            <div style={{ width: '100%', height: 350 }}>
                      <ResponsiveContainer>
              <BarChart
                width={400}
                height={400}
                data={formatShapData()}
                layout="vertical"
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
                  dataKey="value" 
                  fill="#1890ff"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OutputDetails;