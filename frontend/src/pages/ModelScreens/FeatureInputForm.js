import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Alert, Spin, AutoComplete } from 'antd';
import { SearchOutlined} from '@ant-design/icons';
const FeatureInputForm = ({ setActiveTab, setPredictionData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();
  const [selectedClaim, setSelectedClaim] = useState('');
  const [isSearched, setIsSearched] = useState(false);

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
        accident_severity: 3,
        claimant_age: 23,
        driver_age: 21,
        driver_experience_years: 23,
        historical_claims_count: 1,
        initial_medical_expenses: 2425,
        injury_severity: 3,
        legal_fees: 15366,
        long_term_care_costs: 67902,
        ongoing_medical_expenses: 29307,
        passenger_count: 1,
        policy_coverage_limits: 48347,
        policy_deductible: 2249,
        time_of_accident: 12,
        vehicle_year: 2005
      };
      
      form.setFieldsValue(prefillData);
    } catch (err) {
      setError('Failed to get data. Please try again.');
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
        body: JSON.stringify({
          ...values,
          accident_severity: Number(values.accident_severity),
          claimant_age: Number(values.claimant_age),
          driver_age: Number(values.driver_age),
          driver_experience_years: Number(values.driver_experience_years),
          historical_claims_count: Number(values.historical_claims_count),
          initial_medical_expenses: Number(values.initial_medical_expenses),
          injury_severity: Number(values.injury_severity),
          legal_fees: Number(values.legal_fees),
          long_term_care_costs: Number(values.long_term_care_costs),
          ongoing_medical_expenses: Number(values.ongoing_medical_expenses),
          passenger_count: Number(values.passenger_count),
          policy_coverage_limits: Number(values.policy_coverage_limits),
          policy_deductible: Number(values.policy_deductible),
          time_of_accident: Number(values.time_of_accident),
          vehicle_year: Number(values.vehicle_year)
        }),
      });

      const data = await response.json();
      setPredictionData(data);
      setActiveTab('2'); // Navigate to ModelInfo tab
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

        <Row gutter={[12, 12]} style={{ marginBottom: '24px', width: '100%' }}>
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
                label="Accident severity" 
                name="accident_severity" 
                rules={[{ required: true, message: 'Please input accident severity' }]}
              >
                <Input type="number" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label="Claimant's age" 
                name="claimant_age" 
                rules={[{ required: true, message: 'Please input claimant age' }]}
              >
                <Input type="number" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label="Driver's age" 
                name="driver_age" 
                rules={[{ required: true, message: 'Please input driver age' }]}
              >
                <Input type="number" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label="Driver's experience in years" 
                name="driver_experience_years" 
                rules={[{ required: true, message: 'Please input driver experience' }]}
              >
                <Input type="number" style={inputStyle} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]} justify="start" align="top">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label="Historical claims count" 
                name="historical_claims_count" 
                rules={[{ required: true, message: 'Please input historical claims' }]}
              >
                <Input type="number" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label="Initial medical expenses" 
                name="initial_medical_expenses" 
                rules={[{ required: true, message: 'Please input initial expenses' }]}
              >
                <Input 
                  type="number" 
                  addonBefore="$"
                  style={inputStyle} 
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label="Injury severity" 
                name="injury_severity" 
                rules={[{ required: true, message: 'Please input injury severity' }]}
              >
                <Input type="number" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label="Legal fees" 
                name="legal_fees" 
                rules={[{ required: true, message: 'Please input legal fees' }]}
              >
                <Input 
                  type="number" 
                  addonBefore="$"
                  style={inputStyle} 
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]} justify="start" align="top">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label="Long term care costs" 
                name="long_term_care_costs" 
                rules={[{ required: true, message: 'Please input care costs' }]}
              >
                <Input 
                  type="number" 
                  addonBefore="$"
                  style={inputStyle} 
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label="Ongoing medical expenses" 
                name="ongoing_medical_expenses" 
                rules={[{ required: true, message: 'Please input ongoing expenses' }]}
              >
                <Input 
                  type="number" 
                  addonBefore="$"
                  style={inputStyle} 
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label="Passenger count" 
                name="passenger_count" 
                rules={[{ required: true, message: 'Please input passenger count' }]}
              >
                <Input type="number" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label="Policy coverage limits" 
                name="policy_coverage_limits" 
                rules={[{ required: true, message: 'Please input coverage limits' }]}
              >
                <Input 
                  type="number" 
                  addonBefore="$"
                  style={inputStyle} 
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]} justify="start" align="top">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label="Policy deductible" 
                name="policy_deductible" 
                rules={[{ required: true, message: 'Please input policy deductible' }]}
              >
                <Input 
                  type="number" 
                  addonBefore="$"
                  style={inputStyle} 
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label="Time of accident" 
                name="time_of_accident" 
                rules={[{ required: true, message: 'Please input accident time' }]}
              >
                <Input type="number" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item 
                label="Vehicle year" 
                name="vehicle_year" 
                rules={[{ required: true, message: 'Please input vehicle year' }]}
              >
                <Input type="number" style={inputStyle} />
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

export default FeatureInputForm;