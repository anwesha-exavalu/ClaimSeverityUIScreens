import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const FeatureWeightsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://34.234.94.92:5000/predict", { 
            headers: {
              'Content-Type': 'application/json',}}); // Replace with actual API endpoint
        const result = response.data;
        const coefficients = result.model_weights.coefficients;
        
        const formattedData = Object.entries(coefficients).map(([feature, value], index) => {
          const formattedFeature = feature
            .split("_")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          
          let explanation = "";
          if (value > 3000) {
            explanation = "More Significant, Increases claim cost.";
          } else if (value > 0 && value < 3000) {
            explanation = "Moderately Significant, Increases claim cost.";
          } else {
            explanation = "Significant, Decreases claim cost.";
          }
          
          return {
            key: index + 1,
            feature: formattedFeature,
            weight: value.toFixed(2),
            explanation: explanation,
          };
        });
        
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const columns = [
    {
      title: "Feature",
      dataIndex: "feature",
      key: "feature",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Explanation",
      dataIndex: "explanation",
      key: "explanation",
    },
  ];

  return <Table columns={columns} dataSource={data} loading={loading} pagination={{ pageSize: 5 }} />;
};

export default FeatureWeightsTable;
