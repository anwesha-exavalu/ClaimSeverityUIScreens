import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Statistic, Spin, Alert, Form } from 'antd';
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
    setLoading(true);

    const storedPolicyNumber = localStorage.getItem('currentPolicyNumber');
    const storedCustomerId = localStorage.getItem('currentCustomerId');
    const storedFirstName = localStorage.getItem('currentCustomerFirstName');
    const storedLastName = localStorage.getItem('currentCustomerLastName');

    if (storedPolicyNumber) setPolicyNumber(storedPolicyNumber);
    if (storedCustomerId) setCustomerId(storedCustomerId);
    if (storedFirstName) setCustomerFirstName(storedFirstName);
    if (storedLastName) setCustomerLastName(storedLastName);
  }, []);

  // Card styles based on the new layout
  const smallCardStyle = {
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
    marginBottom: '10px',
    height: '40%',
    width: '100%'
  };

  const bigCardStyle = {
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
    marginBottom: '1px',
    height: '100%',
    width: '100%'
  };
  const mediumCardStyle = {
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
    marginBottom: '10px',
    marginTop: '10px',
    height: '60%',
    width: '200%',
    marginLeft: '10px'
  };
  const expCardStyle = {
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
    marginBottom: '10px',
    marginTop: '12px',
    height: '100%'
  };

  // Check if flag is 1
  const isAnomalyDetected = predictionData["Predicted FLAG"] === 1;

  return (
    <div style={{ padding: '1%' }}>
      <Row>
        {/* Left Column - Account Information */}

        <Card
          type="inner"
          title="Customer Details"
          headStyle={{
            backgroundColor: '#f5f5f5',
            fontWeight: 600
          }}
          style={{ height: '230px', boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)", width: '800px', marginBottom: '50px' }}
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
              <Text strong>Workers Compensation</Text>
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
              <Text strong>Medical Invoice Analysis - Workers Compensation</Text>
            </div>

          </div>
        </Card>



      </Row>




      <Row gutter={[10, 10]}>
        {/* First row - Small cards and feature importance */}
        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Card style={smallCardStyle} bordered={true}>
            <Title level={4}>Model Prediction</Title>
            <Alert
              message={isAnomalyDetected ? "Anomaly Detected" : "No Anomaly Detected"}
              description={isAnomalyDetected ? "Need Review!" : ""}
              type={isAnomalyDetected ? "error" : "success"}
              style={{
                marginBottom: 16,
                fontWeight: 'bold'
              }}
            />
          </Card>
          <Card style={mediumCardStyle} bordered={true}>
            <div style={{ textAlign: 'center' }}>
              <img src='/ConfusionMatrix.png' alt='Confusion Matrix' />
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Card style={smallCardStyle} bordered={true}>
            <Title level={4}>Risk Score</Title>
            <Statistic
              value={(predictionData["Probability Score"] * 100).toFixed(2) + "%"}
              valueStyle={{
                color: predictionData["Probability Score"] > 0.5 ? 'crimson' : 'green',
                fontWeight: 'bold'
              }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card style={bigCardStyle} bordered={true}>
            <div style={{ textAlign: 'left', width: '100%', height: '100%' }}>
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
            <Title level={4}>Explanation of Feature Impact</Title>
            <div
              dangerouslySetInnerHTML={{
                __html: predictionData["SHAP Explanation"]
                  ? predictionData["SHAP Explanation"].replace(/\n/g, '<br/>')
                    .replace(/(\d+)\. ([^-]+) - /g, '<span style="color: blue; font-weight: bold; font-size: 1.1em;">$1</span>. <span style="color: blue; font-weight: bold; font-size: 1.1em;">$2</span> - ')
                  : 'No detailed explanation available.'
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OutputDetailsMedical;