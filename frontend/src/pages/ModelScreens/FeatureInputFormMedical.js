import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Alert, Spin, Card, Typography, DatePicker } from 'antd';
const { Title } = Typography;

const FeatureInputFormMedical = ({ setActiveTab, setPredictionData }) => {
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
    
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const response = await fetch('http://34.234.94.92:5000/get-form-data', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      if (data) {
        form.setFieldsValue(data);
      }
    } catch (err) {
      setError('Failed to fetch form data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://34.234.94.92:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      setPredictionData(data);
      setActiveTab('3'); // Navigate to Output tab
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Shared input style with consistent box shadow
  const inputStyle = {
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
    width: "100%"
  };

  // Shared button style with consistent box shadow
  const buttonStyle = {
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  };

  // Form Item style to ensure labels are always on top and don't wrap
  const formItemStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "16px"
  };

  // Label style to prevent wrapping
  const labelStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "block",
    width: "100%"
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
        <div className="policy-details-container">
          <Spin spinning={loading}>
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
          </Spin>
        </div>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ width: '100%' }}
        >
          <Row gutter={[24, 16]} justify="start" align="top">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>Insurer FEIN</span>}
                name="Insurer FEIN" 
                rules={[{ required: true, message: 'Please input Insurer FEIN' }]}
                style={formItemStyle}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>Insurer Postal Code</span>}
                name="Insurer Postal Code" 
                rules={[{ required: true, message: 'Please input Insurer Postal Code' }]}
                style={formItemStyle}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>Employer FEIN</span>}
                name="Employer FEIN" 
                rules={[{ required: true, message: 'Please input Employer FEIN' }]}
                style={formItemStyle}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>Employer Physical City</span>}
                name="Employer Physical City" 
                rules={[{ required: true, message: 'Please input Employer City' }]}
                style={formItemStyle}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]} justify="start" align="top">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>Employee Mailing City</span>}
                name="Employee Mailing City" 
                rules={[{ required: true, message: 'Please input Employee City' }]}
                style={formItemStyle}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>Employee Gender Code</span>}
                name="Employee Gender Code" 
                rules={[{ required: true, message: 'Please input Gender Code' }]}
                style={formItemStyle}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>Employee Date of Injury</span>}
                name="Employee Date of Injury" 
                rules={[{ required: true, message: 'Please input Date of Injury' }]}
                style={formItemStyle}
              >
                <DatePicker style={{ ...inputStyle, width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>Total Charge Per Bill</span>}
                name="Total Charge Per Bill" 
                rules={[{ required: true, message: 'Please input Total Charge' }]}
                style={formItemStyle}
              >
                <Input 
                  addonBefore="$" 
                  style={inputStyle} 
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]} justify="start" align="top">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>Admission Hour</span>}
                name="Admission Hour" 
                rules={[{ required: true, message: 'Please input Admission Hour' }]}
                style={formItemStyle}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>Admission Type Code</span>}
                name="Admission Type Code" 
                rules={[{ required: true, message: 'Please input Admission Type' }]}
                style={formItemStyle}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>First ICD Diagnosis Code</span>}
                name="First ICD Diagnosis Code" 
                rules={[{ required: true, message: 'Please input First ICD Code' }]}
                style={formItemStyle}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>Second ICD Diagnosis Code</span>}
                name="Second ICD Diagnosis Code" 
                rules={[{ required: false }]}
                style={formItemStyle}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]} justify="start" align="top">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>Third ICD Diagnosis Code</span>}
                name="Third ICD Diagnosis Code" 
                rules={[{ required: false }]}
                style={formItemStyle}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>Principal Diagnosis Code</span>}
                name="Principal Diagnosis Code" 
                rules={[{ required: true, message: 'Please input Principal Diagnosis' }]}
                style={formItemStyle}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>Admitting Diagnosis Code</span>}
                name="Admitting Diagnosis Code" 
                rules={[{ required: true, message: 'Please input Admitting Diagnosis' }]}
                style={formItemStyle}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>Policy Start Date</span>}
                name="policy_start_date" 
                rules={[{ required: true, message: 'Please input Policy Start Date' }]}
                style={formItemStyle}
              >
                <DatePicker style={{ ...inputStyle, width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]} justify="start" align="top">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>First ICD Procedure Code</span>}
                name="First ICD Procedure Code" 
                rules={[{ required: false }]}
                style={formItemStyle}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>Second ICD Procedure Code</span>}
                name="Second ICD Procedure Code" 
                rules={[{ required: false }]}
                style={formItemStyle}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>Billing Provider Last Name/Group</span>}
                name="Billing Provider Last Name or Group" 
                rules={[{ required: true, message: 'Please input Billing Provider' }]}
                style={formItemStyle}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>Billing Provider City</span>}
                name="Billing Provider City" 
                rules={[{ required: true, message: 'Please input Provider City' }]}
                style={formItemStyle}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]} justify="start" align="top">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>FLAG</span>}
                name="FLAG" 
                rules={[{ required: true, message: 'Please input FLAG' }]}
                style={formItemStyle}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>Length of Stay</span>}
                name="Length_of_Stay" 
                rules={[{ required: true, message: 'Please input Length of Stay' }]}
                style={formItemStyle}
              >
                <Input type="number" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>Date of Joining</span>}
                name="date_of_joining" 
                rules={[{ required: true, message: 'Please input Date of Joining' }]}
                style={formItemStyle}
              >
                <DatePicker style={{ ...inputStyle, width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>Diagnosis Related Group Code</span>}
                name="Diagnosis Related Group Code" 
                rules={[{ required: true, message: 'Please input Group Code' }]}
                style={formItemStyle}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]} justify="start" align="top">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label={<span style={labelStyle}>ICD Principal Procedure Code</span>}
                name="ICD Principal Procedure Code" 
                rules={[{ required: true, message: 'Please input Principal Procedure' }]}
                style={formItemStyle}
              >
                <Input style={inputStyle} />
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ marginTop: '24px' }} justify="start">
            <Col xs={24} sm={6} md={4} lg={3}>
              <Button 
                type="primary" 
                htmlType="submit"
                loading={loading}
                size="large"
                style={{ 
                  ...buttonStyle,
                  width: '100%'
                }}
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

export default FeatureInputFormMedical;