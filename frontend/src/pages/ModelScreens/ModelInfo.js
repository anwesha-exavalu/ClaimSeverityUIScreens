import React from 'react';
import { Card, Row, Col, Table, Typography, Statistic } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ModelInfo = () => {
  // Sample feature weights data
  const featureWeights = [
    { key: '1', feature: 'Accident severity', weight: 0.35 },
    { key: '2', feature: "Claimant's age", weight: 0.25 },
    { key: '3', feature: "Driver's age", weight: 0.20 },
    { key: '4', feature: "Driver's experience in years", weight: 0.15 },
    { key: '5', feature: 'Historical claims count', weight: 0.05 },
  ];

  // Table columns configuration
  const columns = [
    {
      title: 'Features',
      dataIndex: 'feature',
      key: 'feature',
    },
    {
      title: 'Values',
      dataIndex: 'weight',
      key: 'weight',
      render: (text) => `${(text * 100).toFixed(1)}%`,
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        {/* Left Column */}
        <Col span={8}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* First Card */}
            <Card style={{  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
              <Title level={4}>R² Score</Title>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Statistic
                    title="Value"
                    value={245}
                  />
                </Col>
                {/* <Col span={24}>
                  <Statistic
                    title="Average Cost"
                    value={52450}
                    prefix="$"
                  />
                </Col>
                <Col span={24}>
                  <Statistic
                    title="Prediction Accuracy"
                    value={87}
                    suffix="%"
                    prefix={<ArrowUpOutlined />}
                    valueStyle={{ color: '#3f8600' }}
                  />
                </Col> */}
              </Row>
            </Card>

            {/* Second Card */}
            <Card style={{  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
              <Title level={4}>Mean Absolute Error</Title>
              <Row gutter={[16, 16]}>
                 <Col span={24}>
                  <Statistic
                    title="MAE"
                    value={4320}
                    prefix="$"
                  />
                </Col>
               {/* <Col span={24}>
                  <Statistic
                    title="RMSE"
                    value={5890}
                    prefix="$"
                  />
                </Col>
                <Col span={24}>
                  <Statistic
                    title="R² Score"
                    value={0.82}
                    precision={2}
                  />
                </Col> */}
              </Row>
            </Card>
          </div>
        </Col>

        {/* Right Column - Scatter Plot */}
        <Col span={16}>
          <Card style={{  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
            <Title level={4}>Actual vs. Predicted Claims</Title>
            <div style={{ 
              width: '100%', 
              height: '280px', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              background: '#fafafa',
              border: '1px solid #f0f0f0',
              borderRadius: '4px'
            }}>
              <img 
                src="/imageChart.png" 
                alt="Claims scatter plot" 
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Feature Weights Table */}
      <Row style={{ marginTop: '16px' }}>
        <Col span={24}>
          <Card style={{  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
            <Title level={4}>Feature Weights</Title>
            <Table 
              columns={columns} 
              dataSource={featureWeights}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ModelInfo;