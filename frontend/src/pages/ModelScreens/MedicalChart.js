import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label,
    LabelList } from 'recharts';

const FeatureImportanceChart = () => {
    const data = [
        {
          name: 'Billing Provider Last Name or Group',
          value: 8.5,
          annotation: 'MATACORDA REGION'
        },
        {
          name: 'Principal Diagnosis Code',
          value: 8.2,
          annotation: 'M75.91'
        },
        {
          name: 'Employee Mailing City',
          value: 7.5,
          annotation: 'DEL CAMPO'
        },
        {
          name: 'Admitting Diagnosis Code',
          value: 6.8,
          annotation: 'M75.91'
        },
        {
          name: 'Employer Physical City',
          value: 5.8,
          annotation: 'WHARTON'
        },
        {
          name: 'Employer FEIN',
          value: 4.5,
          annotation: 'ZZZD0652X'
        }
      ];
      const shortenedData = data.map(item => ({
        ...item,
        shortName: item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name
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
             domain={[0, 10]}
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
             width={150}
             axisLine={true}
             tickLine={false}
          />
<Tooltip 
            formatter={(value, name) => [value, "Impact Score"]}
            labelFormatter={(label) => {
              const item = shortenedData.find(d => d.shortName === label);
              return item ? item.name : label;
            }}
          />
          <Bar dataKey="value" fill="#0000FF" barSize={18} >
          
            
             <LabelList content={renderCustomizedLabel} />
           </Bar>
        </BarChart>
      </ResponsiveContainer>
     
    </div>
  );
};

export default FeatureImportanceChart;