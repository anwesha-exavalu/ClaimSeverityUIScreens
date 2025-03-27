import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Alert, Spin, AutoComplete, Card, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const FeatureInputForm = ({ setActiveTab, setPredictionData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();
  const [selectedClaim, setSelectedClaim] = useState('');
  const [isSearched, setIsSearched] = useState(false);
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
  // Generate random claim numbers for suggestions
  const generateClaimNumbers = () => {
    const numbers = [];
    for (let i = 0; i < 5; i++) {
      const randomNum = Math.floor(Math.random() * 9000000) + 1000000;
      numbers.push({ value: `CLM${randomNum}` });
    }
    return numbers;
  };

  const handleSearch = () => {
    if (selectedClaim) {
      setIsSearched(true);
    }
  };

  const getData = async () => {
    setLoading(true);
    setError(null);

    try {
      const prefillData = {
        Initial_Class_of_Claim: "Bodily Injury",
        Claimant_Injuries: "Severe",
        Repairable_Flag: "No",
        Initial_Attorney_Involvement: "Yes",
        Primary_Cause_of_Accident: "Rear-end Collision",
        Rate_Class: "Preferred",
        Non_Drivable_Flag: "No",
        Claimant_State: "NY",
        Primary_Accident_Description: "Highway Accident"
        // Initial_Class_of_Claim: "Comprehensive",
        // Claimant_Injuries: "Severe",
        // Repairable_Flag: "No",
        // Initial_Attorney_Involvement: "No",
        // Primary_Cause_of_Accident: "Rollover",
        // Rate_Class: "Standard",
        // Non_Drivable_Flag: "No",
        // Claimant_State: "NY",
        // Primary_Accident_Description: "Parking Lot Incident"

      };

      form.setFieldsValue(prefillData);
    } catch (err) {
      setError('Failed to get data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handlePredict = () => {
    setLoading(true);
    // Let the form handle validation and submission
    form.submit();
  };

  const onFinish = async (values) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://3.88.13.136:5000//predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          Initial_Class_of_Claim: String(values.Initial_Class_of_Claim),
          Claimant_Injuries: String(values.Claimant_Injuries),
          Repairable_Flag: String(values.Repairable_Flag),
          Initial_Attorney_Involvement: String(values.Initial_Attorney_Involvement),
          Primary_Cause_of_Accident: String(values.Primary_Cause_of_Accident),
          Rate_Class: String(values.Rate_Class),
          Non_Drivable_Flag: String(values.Non_Drivable_Flag),
          Claimant_State: String(values.Claimant_State),
          Primary_Accident_Description: String(values.Primary_Accident_Description),

        }),
      });

      const data = await response.json();
      setPredictionData(data);
      setActiveTab('3'); // Navigate to ModelInfo tab
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Shared input style with consistent box shadow
  const inputStyle = {
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
  };

  // Shared button style with consistent box shadow
  const buttonStyle = {
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div className="feature-input-form-container" style={{ width: '100%', maxWidth: '100%', margin: '0', padding: '0' }}>
      <Spin spinning={loading}>
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: '16px', width: '100%' }}
          />
        )}
        {/* <div className="policy-details-container">
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
        </div> */}
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

        <Row gutter={[12, 12]} style={{ marginBottom: '24px', width: '100%', marginTop: '20px' }}>

          <Col xs={24} sm={12} md={6} lg={6}>
            <AutoComplete
              style={{ width: '100%' }}
              options={generateClaimNumbers()}
              placeholder="Search claim number..."
              value={selectedClaim}
              onChange={(value) => {
                setSelectedClaim(value);
                setIsSearched(false);
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={6} lg={6}>
            {!isSearched ? (
              <Button
                type="primary"
                onClick={handleSearch}
                disabled={!selectedClaim}
                style={{ ...buttonStyle, width: '40%' }}
                icon={<SearchOutlined />}
              >
                Search
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={getData}
                style={{ ...buttonStyle, width: '40%' }}

              >
                Get Data
              </Button>
            )}
          </Col>
        </Row>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ width: '100%' }}
        >
          <Row gutter={[24, 16]} justify="start" align="top">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                label="Initial Class of Claim"
                name="Initial_Class_of_Claim"
                rules={[{ required: true, message: 'Please input accident severity' }]}
              >
                <Input type="text" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                label="Claimant_Injuries"
                name="Claimant_Injuries"
                rules={[{ required: true, message: 'Please input claimant age' }]}
              >
                <Input type="text" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                label="Repairable Flag"
                name="Repairable_Flag"
                rules={[{ required: true, message: 'Please input driver age' }]}
              >
                <Input type="text" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                label="Initial Attorney Involvement"
                name="Initial_Attorney_Involvement"
                rules={[{ required: true, message: 'Please input driver experience' }]}
              >
                <Input type="text" style={inputStyle} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]} justify="start" align="top">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                label="Primary Cause of Accident"
                name="Primary_Cause_of_Accident"
                rules={[{ required: true, message: 'Please input historical claims' }]}
              >
                <Input type="text" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                label="Rate Class"
                name="Rate_Class"
                rules={[{ required: true, message: 'Please input initial expenses' }]}
              >
                <Input
                  type="text"

                  style={inputStyle}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                label="Non Drivable Flag"
                name="Non_Drivable_Flag"
                rules={[{ required: true, message: 'Please input injury severity' }]}
              >
                <Input type="text" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                label="Claimant State"
                name="Claimant_State"
                rules={[{ required: true, message: 'Please input legal fees' }]}
              >
                <Input
                  type="text"

                  style={inputStyle}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]} justify="start" align="top">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                label="Primary Accident Description"
                name="Primary_Accident_Description"
                rules={[{ required: true, message: 'Please input care costs' }]}
              >
                <Input
                  type="text"

                  style={inputStyle}
                />
              </Form.Item>
            </Col>

          </Row>


          <Row style={{ marginTop: '24px' }} justify="start">
            <Col xs={24} sm={6} md={4} lg={3}>
              <Button
                type="primary"
                // htmlType="submit"
                loading={loading}
                size="large"
                style={{
                  ...buttonStyle,
                  width: '100%'
                }}
                onClick={handlePredict}
              >
                Predict
              </Button>
            </Col>
          </Row>
        </Form>
      </Spin>
    </div>
  );
};

export default FeatureInputForm;