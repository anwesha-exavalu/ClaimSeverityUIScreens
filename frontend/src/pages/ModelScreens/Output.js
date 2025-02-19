import React from 'react';
import { Card, Row, Col, Typography, Statistic } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ArrowUpOutlined, DollarOutlined } from '@ant-design/icons';

const { Title } = Typography;

const OutputDetails = () => {
  const survivalData = [
    { feature: 'Gender', value: 0.2 },
    { feature: 'deck', value: 0.1 },
    { feature: 'PassengerClass', value: 0.09 },
    { feature: 'Fare', value: 0.05 },
    { feature: 'Embarked', value: 0.03 },
    { feature: 'Age', value: 0.02 },
    { feature: 'No_of_parents_plus_children_on_board', value: 0.015 },
    { feature: 'No_of_siblings_plus_spouses_on_board', value: 0.01 }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        {/* Left Column */}
        <Col span={8}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* First Card */}
            <Card style={{  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
              <Title level={4}>Predicted Claim Amount</Title>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Statistic
                    title="Amount"
                    value={82.5}
                    // suffix="%"
                    prefix={<DollarOutlined />}
                    valueStyle={{ color: '#3f8600' }}
                  />
                </Col>
                {/* <Col span={24}>
                  <Statistic
                    title="Total Features"
                    value={8}
                  />
                </Col>
                <Col span={24}>
                  <Statistic
                    title="Most Important Feature"
                    value="Gender"
                    valueStyle={{ fontSize: '16px' }}
                  />
                </Col> */}
              </Row>
            </Card>

            {/* Second Card */}
            <Card style={{  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
              <Title level={4}>Inference</Title>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                <Title level={5}>Summary</Title>
                </Col>
                {/* <Col span={24}>
                  <Statistic
                    title="Highest Impact"
                    value={0.2}
                    precision={2}
                  />
                </Col>
                <Col span={24}>
                  <Statistic
                    title="Lowest Impact"
                    value={0.01}
                    precision={2}
                  />
                </Col> */}
              </Row>
            </Card>
          </div>
        </Col>

        {/* Right Column - Bar Chart */}
        <Col span={16}>
          <Card style={{  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
            <Title level={4}>Average Impact on Predicted Survival (mean absolute SHAP value)</Title>
            <div style={{ width: '100%', height: '350px', display: 'flex', justifyContent: 'center' }}>
              <BarChart
                width={1000}
                height={400}
                data={survivalData}
                layout="vertical"
                margin={{ top: 8, right: 30, left: 70, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 0.25]} />
                <YAxis 
                  type="category" 
                  dataKey="feature" 
                  width={240}
                />
                <Tooltip />
                <Bar 
                  dataKey="value" 
                  fill="#1890ff"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OutputDetails;