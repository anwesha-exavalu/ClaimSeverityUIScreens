import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Modal, Card, Alert, Spin } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const FeatureInputForm = ({ setActiveTab }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://3.90.78.81:5000/predict', {
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
      setPredictionResult(data);
      setIsModalOpen(true);
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatShapData = (shapValues) => {
    return shapValues.map(([name, value]) => ({
      name: name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      value: Math.abs(value),
      actualValue: value
    }));
  };

  return (
    <Spin spinning={loading}>
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item 
              label="Accident severity" 
              name="accident_severity" 
              rules={[{ required: true, message: 'Please input accident severity' }]}
            >
              <Input type="number" style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item 
              label="Claimant's age" 
              name="claimant_age" 
              rules={[{ required: true, message: 'Please input claimant age' }]}
            >
              <Input type="number" style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item 
              label="Driver's age" 
              name="driver_age" 
              rules={[{ required: true, message: 'Please input driver age' }]}
            >
              <Input type="number" style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item 
              label="Driver's experience in years" 
              name="driver_experience_years" 
              rules={[{ required: true, message: 'Please input driver experience' }]}
            >
              <Input type="number" style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={6}>
            <Form.Item 
              label="Historical claims count" 
              name="historical_claims_count" 
              rules={[{ required: true, message: 'Please input historical claims' }]}
            >
              <Input type="number" style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item 
              label="Initial medical expenses" 
              name="initial_medical_expenses" 
              rules={[{ required: true, message: 'Please input initial expenses' }]}
            >
              <Input type="number" style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item 
              label="Injury severity" 
              name="injury_severity" 
              rules={[{ required: true, message: 'Please input injury severity' }]}
            >
              <Input type="number" style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item 
              label="Legal fees" 
              name="legal_fees" 
              rules={[{ required: true, message: 'Please input legal fees' }]}
            >
              <Input type="number" style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={6}>
            <Form.Item 
              label="Long term care costs" 
              name="long_term_care_costs" 
              rules={[{ required: true, message: 'Please input care costs' }]}
            >
              <Input type="number" style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item 
              label="Ongoing medical expenses" 
              name="ongoing_medical_expenses" 
              rules={[{ required: true, message: 'Please input ongoing expenses' }]}
            >
              <Input type="number" style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item 
              label="Passenger count" 
              name="passenger_count" 
              rules={[{ required: true, message: 'Please input passenger count' }]}
            >
              <Input type="number" style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item 
              label="Policy coverage limits" 
              name="policy_coverage_limits" 
              rules={[{ required: true, message: 'Please input coverage limits' }]}
            >
              <Input type="number" style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={6}>
            <Form.Item 
              label="Policy deductible" 
              name="policy_deductible" 
              rules={[{ required: true, message: 'Please input policy deductible' }]}
            >
              <Input type="number" style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item 
              label="Time of accident" 
              name="time_of_accident" 
              rules={[{ required: true, message: 'Please input accident time' }]}
            >
              <Input type="number" style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item 
              label="Vehicle year" 
              name="vehicle_year" 
              rules={[{ required: true, message: 'Please input vehicle year' }]}
            >
              <Input type="number" style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="space-between">
          <Col>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={loading}
              style={{ 
                width: "100px", 
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" 
              }}
            >
              Predict
            </Button>
          </Col>
        </Row>
      </Form>

      <Modal
        title="Prediction Results"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
        ]}
        width={800}
      >
        {predictionResult && (
          <div>
            <Card style={{ marginBottom: 16 }}>
              <Row>
                <Col span={12}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Predicted Claim Amount</h3>
                  <p style={{ fontSize: 24, fontWeight: 700, color: '#1890ff' }}>
                    ${predictionResult.prediction.toFixed(2)}
                  </p>
                </Col>
                <Col span={12}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Model Performance</h3>
                  <p>R² Score: {(predictionResult.r2_score * 100).toFixed(2)}%</p>
                  <p>Mean Absolute Error: ${predictionResult.mae.toFixed(2)}</p>
                </Col>
              </Row>
            </Card>

            <Card title="Top 5 Feature Impacts (SHAP Values)">
              <div style={{ height: 400, width: '100%' }}>
                <ResponsiveContainer>
                  <BarChart data={formatShapData(predictionResult.top_5_shap_values)}>
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis label={{ value: 'Impact on Prediction', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                      formatter={(value, name, props) => [
                        `${props.payload.actualValue.toFixed(2)}`,
                        'Impact'
                      ]}
                    />
                    <Bar dataKey="value" fill="#1890ff" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        )}
      </Modal>
    </Spin>
  );
};

export default FeatureInputForm;