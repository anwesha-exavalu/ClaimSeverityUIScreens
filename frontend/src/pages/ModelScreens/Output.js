import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Statistic,  Tooltip as AntTooltip } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { DollarOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const OutputDetails = ({ predictionData }) => {
  const [policyNumber, setPolicyNumber] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
   const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const tooltipStyle = {
    backgroundColor: '#e6f7ff',
    color: '#0050b3',
    padding: '8px 12px',
    borderRadius: '4px',
    maxWidth: '300px'
  };

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
      const [feature, value, shapValue] = shapItem;

      // Format feature name without underscores, properly capitalized
      const formattedFeature = feature
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return {
        feature: formattedFeature,
        value: value,
        shapValue: shapValue,
        positiveValue: shapValue > 0 ? shapValue : 0,
        negativeValue: shapValue < 0 ? Math.abs(shapValue) : 0
      };
    });
  };

  const getFeatureDetails = () => {
    if (!predictionData || !predictionData.top_5_shap_values) {
      return [];
    }

    return predictionData.top_5_shap_values.map(([feature, value, shapValue]) => {
      const formattedFeature = feature
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      const formattedShapValue = shapValue > 0
        ? `+${Math.abs(shapValue).toFixed(2)}`
        : shapValue.toFixed(2);

      const descriptions = {
        "Claimant Injuries": "Increases claim amount due to high medical and legal costs.",
        "Repairable Flag": "Higher claims as non-repairable vehicles are often total losses.",
        "Initial Class of Claim": "Lowers claim amount since comprehensive claims are usually less costly.",
        "Primary Cause of Accident": "Unexpectedly reduces claims, possibly due to less severe injuries in the dataset.",
        "Non Drivable Flag": "Lowers claim amount since drivable vehicles have less damage and repair costs."
      };

      return `${formattedFeature} (${value}) → ${formattedShapValue} → ${descriptions[formattedFeature] || ''}`;
    });
  };

  const featureDetails = getFeatureDetails();
  const positiveFeatures = featureDetails.filter(detail => detail.includes('→ +'));
  const negativeFeatures = featureDetails.filter(detail => detail.includes('→ -'));

  // Common card style to maintain consistency
  const cardStyle = {
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
    height: "100%",
    width: "100%"
  };

  return (
    <div style={{ padding: '2%' }}>
      {/* ... (previous policy and customer details remain the same) ... */}
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
            style={{height: '230px', boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",}}
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
            style={{height: '230px', boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",}}
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
                <Text strong  className="justify-self-end">12/25/2024</Text>
              </div>
              {/* <div className="grid grid-cols-2 items-center">
                <Text type="secondary" className="justify-self-start">Vehicle Identification NO. - </Text>
                <Text strong className="justify-self-end">skylineprop@gmail.com</Text>
              </div> */}
            </div>
          </Card>
        </Col>
      </Row>
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
            <Title level={4}>Feature Impact on Prediction (SHAP values) 
              <AntTooltip
                            title="SHAP values show how each factor influences the claim amount. Positive values increase it, while negative values decrease it, helping explain the model's prediction."
                            overlayStyle={tooltipStyle}
                          >
                            <InfoCircleOutlined style={{ marginLeft: '8px', fontSize: windowWidth < 576 ? '14px' : '16px', color: '#1890ff' }} />
                          </AntTooltip></Title>
            <div style={{ width: '100%', height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={formatShapData()}
                  margin={{ top: 8, right: 40, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    allowDecimals={true}
                  />
                  <YAxis
                    type="category"
                    dataKey="feature"
                    width={240}
                  />
                  <RechartsTooltip
                    formatter={(value, name, props) => {
                      const tooltipContent = [
                        
                        ` ${value.toFixed(2)} Value: ${props.payload.value}`
                      ];

                      // Only add impact type if the impact is not zero
                      if (value.toFixed(2) !== 0) {
                        tooltipContent.push(
                          name === 'positiveValue' ? 'Positive Impact' : 'Negative Impact'
                        );
                      }

                      return tooltipContent;
                    }}
                  />

                  <Bar
                    dataKey="positiveValue"
                    fill="#1890ff"
                    stackId="a"
                    radius={[0, 4, 4, 0]}
                  />
                  <Bar
                    dataKey="negativeValue"
                    fill="#f5222d"
                    stackId="a"
                    radius={[4, 0, 0, 4]}
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
            <li>
              <strong>Claimant Injuries (Severe)</strong> → <strong>+46,825.90</strong> → Increases claim amount due to high medical and legal costs.
            </li>
            <li>
              <strong>Repairable Flag (No)</strong> → <strong>+27,778.15</strong> → Higher claims as non-repairable vehicles are often total losses.
            </li>
            <li>
              <strong>Initial Class of Claim (Comprehensive)</strong> → <strong>-20,270.69</strong> → Lowers claim amount since comprehensive claims are usually less costly.
            </li>
            <li>
              <strong>Primary Cause of Accident (Rollover)</strong> → <strong>-17,501.27</strong> → Unexpectedly reduces claims, possibly due to less severe injuries in the dataset.
            </li>
            <li>
              <strong>Non Drivable Flag (No)</strong> → <strong>-17,354.24</strong> → Lowers claim amount since drivable vehicles have less damage and repair costs.
            </li>
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