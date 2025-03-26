import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, LabelList } from 'recharts';

const FeatureImportanceChart = () => {
    const data = [
        {
          name: 'Length_of_Stay',
          value: 1.5,
          annotation: '15'
        },
        {
          name: 'Billing Provider City',
          value: 0.6,
          annotation: 'BAY CITY'
        },
        {
          name: 'Admission Type Code',
          value: 0.3,
          annotation: '3'
        },
        {
          name: 'Principal Diagnosis Code',
          value: 0.3,
          annotation: 'M75.91'
        },
        {
          name: 'Admission Hour',
          value: 0.3,
          annotation: '12:00 AM'
        },
        {
          name: 'Employee Mailing City',
          value: 0.3,
          annotation: 'EL CAMPO'
        }
    ];

    const shortenedData = data.map(item => ({
        ...item,
        shortName: item.name.length > 25 ? item.name.substring(0, 25) + '...' : item.name
    }));
    
    // Custom label component for annotations
    const renderCustomizedLabel = (props) => {
        const { x, y, width, index } = props;
        if (index === undefined || !shortenedData[index]) return null;
        const annotation = shortenedData[index].annotation;
        
        return (
            <text
                x={x + width + 5}
                y={y + 15}
                fill="#FF0000"
                fontSize={11}
                textAnchor="start"
            >
                {annotation}
            </text>
        );
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer width="100%" height="85%">
                <BarChart
                    layout="vertical"
                    data={shortenedData}
                    margin={{ top: 5, right: 50, left: 10, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        type="number"
                        domain={[0, 1.5]}
                        tickCount={6}
                        axisLine={true}
                        tickLine={true}
                    >
                        <Label
                            value="SHAP Value (Impact on Model Output)"
                            position="bottom"
                            offset={-10}
                        />
                    </XAxis>
                    <YAxis 
                        type="category"
                        dataKey="shortName"
                        tick={{ fontSize: 11 }}
                        width={200}
                        axisLine={true}
                        tickLine={false}
                    />
                    <Tooltip 
                        formatter={(value, name) => [value, "SHAP Impact"]}
                        labelFormatter={(label) => {
                            const item = shortenedData.find(d => d.shortName === label);
                            return item ? item.name : label;
                        }}
                    />
                    <Bar dataKey="value" fill="#0000FF" barSize={18}>
                        <LabelList content={renderCustomizedLabel} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default FeatureImportanceChart;