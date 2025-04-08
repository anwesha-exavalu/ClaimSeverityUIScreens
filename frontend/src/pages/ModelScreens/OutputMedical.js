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
    height: '100%',
    width: '100%'
  };

  const bigCardStyle = {
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
    marginBottom: '1px',
    height: '100%',
    width: '152%',
    marginLeft: '11px'
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
  // Common card style to maintain consistency
  const cardStyle = {
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
    height: "100%",
    width: "100%",
    padding: "10px"
  };

  return (
    <div style={{ padding: '1%' }}>

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
                      }}>Email Address -</Text>
                      <Text strong>smith.john@mail.com</Text>
                    </div>
                  </div>
                </Card>
              </Col>
      
              {/* Right Column - Organization Information */}
              <Col xs={24} sm={12}>
                <Card
                  type="inner"
                  title="Business Details"
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
                        paddingRight: '16px',
                        minWidth: '150px'
                      }}>Model Name -</Text>
                      <Text strong>Medical Invoice Analysis - Workers Compensation</Text>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
   
             
                  <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        {/* Left Column */}
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
            {/* First Card */}
            <Card style={smallCardStyle}>
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

            {/* Second Card */}
            <Card style={{ ...smallCardStyle }}>
            <Title level={4}>Risk Score</Title>
            <Statistic
              value={(predictionData["Probability Score"] * 100).toFixed(2) + "%"}
              valueStyle={{
                color: predictionData["Probability Score"] > 0.5 ? 'crimson' : 'green',
                fontWeight: 'bold'
              }}
            />
               
            </Card>
          </div>
        </Col>

        {/* Right Column - Bar Chart */}
        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <Card style={bigCardStyle}>
          <div style={{ textAlign: 'center' }}>
              <img src='/ConfusionMatrix.png' alt='Confusion Matrix' />
            </div>
          </Card>
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
              
              <div style={{ textAlign: 'left', width: '100%', height: '100%' }}>
              <Title level={4}>Key Factors Behind Prediction</Title>
              <FeatureImportanceChart />
            </div>
           
           
          </Card>
           <Card style={{
              ...cardStyle,
              flex: 1,
              width: '50%'
            }}>
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
       
          
          </div>
        </Col>
      </Row>
      
     
    </div>
  );
};

export default OutputDetailsMedical;