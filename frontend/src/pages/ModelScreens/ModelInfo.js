import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Typography, Statistic, Tooltip } from 'antd';
import { InfoCircleOutlined, DollarOutlined } from '@ant-design/icons';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import FeatureWeightsTable from './FeatureweightTable';

const { Title } = Typography;

const ModelInfo = ({ predictionData }) => {
  // Feature weights data based on model coefficients
  const getFeatureWeights = () => {
    if (!predictionData || !predictionData.model_weights || !predictionData.model_weights.coefficients) {
      return [];
    }
    
    const { coefficients } = predictionData.model_weights;
    
    // Create a data source from the coefficients
    return Object.entries(coefficients)
      .map(([feature, value]) => {
        // Format feature name (convert snake_case to Title Case)
        const formattedFeature = feature.split('_').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        // Generate explanations based on the coefficient value
        let explanation = '';
        if (value > 3000) {
          explanation = `More Significant, Increases claim cost.`;
        } 
        else if(value>0 && value<3000){
          explanation = `Moderately Significant, Increases claim cost.`;
        }
        else {
          explanation = `Significant, Decreases claim cost.`;
        }
        
        return {
          key: feature,
          feature: formattedFeature,
          weight: value,
          explanation: explanation
        };
      })
      .sort((a, b) => Math.abs(b.weight) - Math.abs(a.weight))
      .slice(0, 5)
      .map((item, index) => ({
        ...item,
        key: (index + 1).toString()
      }));
  };

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
      render: (text) => `${text.toFixed(2)}`,
    },
    {
      title: 'Explanation',
      dataIndex: 'explanation',
      key: 'explanation',
    },
  ];

  const generateData = () => {
    const data = [];
    for (let i = 30000; i <= 80000; i += 2000) {
      const pointCount = Math.floor(Math.random() * 3) + 3;
      for (let j = 0; j < pointCount; j++) {
        const variance = (Math.random() - 0.5) * 10000;
        data.push({
          actual: i,
          predicted: i + variance
        });
      }
    }
    return data;
  };

  const data = generateData();

  // Tooltip styles
  const tooltipStyle = {
    backgroundColor: '#e6f7ff',
    color: '#0050b3',
    padding: '8px 12px',
    borderRadius: '4px',
    maxWidth: '300px'
  };
  
  const [selectedModel, setSelectedModel] = useState('');
  
  useEffect(() => {
    // Retrieve the selected model from localStorage when component mounts
    const model = localStorage.getItem('selectedModel');
    if (model) {
      setSelectedModel(model);
    }
  }, []);
  
  return (
    <div style={{ padding: '24px' }}>
      {/* Scatter Plot */}
      {selectedModel && (
        <Title level={3} style={{ marginBottom: '5px', color: 'royalblue', textAlign: "center" }}>
          Linear Regression of {selectedModel} Model
        </Title>
      )}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
            <Title level={4}>Actual vs. Predicted Claims</Title>
            <div style={{ width: '100%', height: 350 }}>
              <ResponsiveContainer>
                <ScatterChart
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    dataKey="actual"
                    name="Actual Claim Cost"
                    domain={[30000, 80000]}
                    label={{ 
                      value: 'Actual Claim Cost',
                      position: 'bottom',
                      offset: 40
                    }}
                    tickFormatter={(value) => `${value.toLocaleString()}`}
                  />
                  <YAxis
                    type="number"
                    dataKey="predicted"
                    name="Predicted Claim Cost"
                    domain={[30000, 80000]}
                    label={{ 
                      value: 'Predicted Claim Cost',
                      angle: -90,
                      position: 'left',
                      offset: 40
                    }}
                    tickFormatter={(value) => `${value.toLocaleString()}`}
                  />
                  <RechartsTooltip 
                    formatter={(value) => `$${value.toLocaleString()}`}
                    labelFormatter={(value) => `Actual: $${value.toLocaleString()}`}
                  />
                  <ReferenceLine
                    segment={[
                      { x: 30000, y: 30000 },
                      { x: 80000, y: 80000 }
                    ]}
                    stroke="red"
                    strokeDasharray="3 3"
                  />
                  <Scatter
                    data={data}
                    fill="#1890ff"
                    opacity={0.6}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col span={8}>
          <Card style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
            <Title level={4}>
              R² Score
              <Tooltip 
                title="Measures how accurately the model explains variations in claim payouts, indicating its reliability in predicting losses (Ranges 0 to 1)."
                overlayStyle={tooltipStyle}
              >
                <InfoCircleOutlined style={{ marginLeft: '8px', fontSize: '16px', color: '#1890ff' }} />
              </Tooltip>
            </Title>
            <Statistic
              value={predictionData?.r2_score ? predictionData.r2_score.toFixed(2) : 0}
             
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
            <Title level={4}>
              Average Claim Payout
              <Tooltip 
                title="Average of the claim payout."
                overlayStyle={tooltipStyle}
              >
                <InfoCircleOutlined style={{ marginLeft: '8px', fontSize: '16px', color: '#1890ff' }} />
              </Tooltip>
            </Title>
            <Statistic
              // value={predictionData?.mae ? predictionData.mae.toFixed(2) : 0}
              value="53412"
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
            <Title level={4}>
              Mean Absolute Error
              <Tooltip 
                title="Measures the average difference between the model's predicted claim payouts and the actual payouts, showing the typical error in predictions."
                overlayStyle={tooltipStyle}
              >
                <InfoCircleOutlined style={{ marginLeft: '8px', fontSize: '16px', color: '#1890ff' }} />
              </Tooltip>
            </Title>
            <Statistic
              value={predictionData?.mae ? predictionData.mae.toFixed(2) : 0}
              prefix={<DollarOutlined />}
              valueStyle={{ color: 'crimson' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Feature Weights Table */}
      <Row style={{ marginTop: '16px' }}>
        <Col span={24}>
          <Card style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
            <Title level={4}>
              Feature Weights
              <Tooltip 
                title="Feature weights show the relative importance of each feature in making predictions. Higher values indicate stronger influence on the model's output."
                overlayStyle={tooltipStyle}
              >
                <InfoCircleOutlined style={{ marginLeft: '8px', fontSize: '16px', color: '#1890ff' }} />
              </Tooltip>
            </Title>
            {/* <Table 
              columns={columns} 
              dataSource={getFeatureWeights()}
              pagination={true}
            /> */}
            <FeatureWeightsTable/>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ModelInfo;