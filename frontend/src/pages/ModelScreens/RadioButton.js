import React, { useState } from "react";
import { Radio } from "antd";

import RealTimeInference from "./RealTimeInferenceContent";
import BatchInference from "./BatchInference";

const RadioButton = () => {
  const [inferenceType, setInferenceType] = useState("real-time");

  return (
    <div style={{ padding: 20,  background: "white" }}>
      <Radio.Group
        onChange={(e) => setInferenceType(e.target.value)}
        value={inferenceType}
        style={{ marginBottom: 20 }}
      >
        <Radio value="real-time">Real Time Inference</Radio>
        <Radio value="batch">Batch Inference</Radio>
      </Radio.Group>

      {inferenceType === "real-time" ? <RealTimeInference /> : <BatchInference/>}
    </div>
  );
};

export default RadioButton;
