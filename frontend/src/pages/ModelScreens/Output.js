import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Statistic, Tooltip } from 'antd';
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
        positiveValue: shapValue > 0 ? shapValue : 0
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
    width: "100%",
    padding: "10px"
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
            style={{ height: '230px', boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '150px 1fr',
                alignItems: 'center'
              }}>
                <Text type="secondary" style={{
                  textAlign: 'right',
                  paddingRight: '16px'
                }}>Policy Number -</Text>
                <Text strong>{policyNumber}</Text>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '150px 1fr',
                alignItems: 'center'
              }}>
                <Text type="secondary" style={{
                  textAlign: 'right',
                  paddingRight: '16px'
                }}>Customer ID -</Text>
                <Text strong>{customerId}</Text>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '150px 1fr',
                alignItems: 'center'
              }}>
                <Text type="secondary" style={{
                  textAlign: 'right',
                  paddingRight: '16px'
                }}>Customer Name -</Text>
                <Text strong>{customerFirstName} {customerLastName}</Text>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '150px 1fr',
                alignItems: 'center'
              }}>
                <Text type="secondary" style={{
                  textAlign: 'right',
                  paddingRight: '16px'
                }}>LOB -</Text>
                <Text strong>Auto Liability</Text>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '150px 1fr',
                alignItems: 'center'
              }}>
                <Text type="secondary" style={{
                  textAlign: 'right',
                  paddingRight: '16px'
                }}>Model Name -</Text>
                <Text strong>Claim severity - Third party auto liability (FNOL)</Text>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '150px 1fr',
                alignItems: 'center'
              }}>
                <Text type="secondary" style={{
                  textAlign: 'right',
                  paddingRight: '16px'
                }}>Date of Loss -</Text>
                <Text strong>01/03/2025</Text>
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
            style={{ height: '230px', boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '150px 1fr',
                alignItems: 'center'
              }}>
                <Text type="secondary" style={{
                  textAlign: 'right',
                  paddingRight: '16px',
                  minWidth: '150px'
                }}>Maker -</Text>
                <Text strong>Ford</Text>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '150px 1fr',
                alignItems: 'center'
              }}>
                <Text type="secondary" style={{
                  textAlign: 'right',
                  paddingRight: '16px',
                  minWidth: '150px'
                }}>Model -</Text>
                <Text strong>Raptor</Text>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '150px 1fr',
                alignItems: 'center'
              }}>
                <Text type="secondary" style={{
                  textAlign: 'right',
                  paddingRight: '16px',
                  minWidth: '150px'
                }}>Model Year -</Text>
                <Text strong>12/25/2024</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: '15px', marginBottom: '15px', width: '305%', display: 'flex', flexWrap: 'nowrap' }}>
        {/* Left Column */}
        <Col xs={24} sm={24} md={12} lg={8} xl={8} style={{
          width: '100%',
          flexGrow: 1
        }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', height: '100%', width: '100%' }}>
            {/* First Card */}
            <Card style={{
              ...cardStyle, flex: 1,
              width: '50%'
            }}>
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
            <Card style={{
              ...cardStyle,
              flex: 1,
              width: '50%'
            }}>
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
      </Row>
   



      <Row gutter={[16, 16]} style={{ marginTop: '15px', marginBottom: '15px', width: '305%', display: 'flex', flexWrap: 'nowrap' }}>
      <Col xs={24} sm={24} md={12} lg={8} xl={8} style={{
          width: '50%',
          flexGrow: 1
        }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', height: '100%', width: '100%' }}>
         
       
           <Card style={{
              ...cardStyle,
              flex: 1,
              width: '50%'
            }}>
                Feature Impact on Prediction (SHAP values)
                <Tooltip
                  title="SHAP values show how each factor influences the claim amount. Positive values increase it, while negative values decrease it, helping explain the model's prediction."
                  overlayStyle={{
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    color: '#fff'
                  }}
                >
                  <InfoCircleOutlined
                    style={{
                      marginLeft: '8px',
                      color: '#1890ff'
                    }}
                  />
                </Tooltip>
             
            
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={formatShapData()}
                  margin={{ top: 8, right: 40, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" allowDecimals={true} />
                  <YAxis type="category" dataKey="feature" width={240} />
                  <RechartsTooltip
                    formatter={(value, name, props) => {
                      const impactValue = Math.abs(value);

                      if (impactValue === 0) return null;

                      const impactDescription = name === 'positiveValue'
                        ? `Positive impact increased the Claim Amount by ${impactValue.toFixed(2)}`
                        : `Negative impact decreased the Claim Amount by ${impactValue.toFixed(2)}`;

                      return [impactDescription];
                    }}
                    labelStyle={{ fontWeight: 'bold' }}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      padding: '10px'
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
           
          </Card>
          <Card style={{
              ...cardStyle,
              flex: 1,
              width: '50%'
            }}>
            <Title
              level={4}
              style={{
                marginBottom: '16px',
                padding: '10px'
              }}
            >
              Inference
            </Title>
            <Title
              level={5}
              style={{
                marginBottom: '12px',
                padding: '10px'
              }}
            >
              Summary
            </Title>
            <ul
              style={{
                listStyleType: 'none',
                padding: '10px',
                maxHeight: '400px',
                overflowY: 'auto'
              }}
            >
              <li style={{ marginBottom: '12px' }}>
                <strong>Initial_Class_of_Claim (Bodily Injury)</strong> → <strong>+46,729</strong> → Claims classified as "Bodily Injury" significantly increase the predicted claim cost, indicating that injury-related claims tend to be much higher than other types.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Initial_Attorney_Involvement (Yes)</strong> → <strong>+31,137</strong> → The presence of an attorney is associated with higher claim costs, likely due to legal fees, negotiations, and extended processing times.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Rate_Class (Standard)</strong> → <strong>-25,538</strong> → Being in the "Standard" rate class lowers the predicted claim cost compared to higher-risk categories, possibly because this group has a lower accident severity or better driving history.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Repairable_Flag (Yes)</strong> → <strong>-23,302</strong> → If a vehicle is repairable, the claim cost is lower, as it avoids total loss payouts and focuses only on repair expenses.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>Primary_Cause_of_Accident (Rear-end Collision)</strong> → <strong>-22,586</strong> → Rear-end collisions tend to have lower claim costs compared to more severe accident types (e.g., head-on collisions or rollovers), possibly due to lower injury severity and repair costs.
              </li>
            </ul>
          </Card>
          </div>
        </Col>
      </Row>

    </div>
  );
};

export default OutputDetails;