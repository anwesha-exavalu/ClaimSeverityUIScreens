import React, { useState } from "react";
import { Button, Dropdown, Menu, Space, Card, Row, Col } from "antd";
import { DownOutlined, DownloadOutlined, UploadOutlined, PlayCircleOutlined } from "@ant-design/icons";

const BatchInference = () => {
  const [selectedOption, setSelectedOption] = useState("Claim Prosperity");
  
  const handleMenuClick = (e) => {
    setSelectedOption(e.key);
  };
   const menu = (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="Claim Prosperity">Claim Prosperity</Menu.Item>
      </Menu>
    );
  
  const buttonStyle = {
    height: 60,
    width: 250,
    fontSize: "medium",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
  };
  
  return (
    <div style={{ padding: 20, border: "1px solid #ccc", borderRadius: 10, background: "white" }}>
         <Row gutter={16} style={{ marginTop: 20 }}>
         <Col span={8}>
       <Dropdown overlay={menu} trigger={["click"]}>
            <Card hoverable style={{ height: 60, width: 250, cursor: "pointer", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", fontSize: "medium" }}>
              {selectedOption} <DownOutlined style={{ float: "right" }} />
            </Card>
          </Dropdown>
          </Col>
          <Col span={8}>
          <Button type="default" style={buttonStyle} icon={<DownloadOutlined />}>Download Sample File</Button>
          </Col>
          </Row>

          <Row gutter={16} style={{ marginTop: 20 }}>
         <Col span={8}>
         <Button type="default" style={buttonStyle} icon={<UploadOutlined />}>Upload File</Button>
          </Col>
          <Col span={8}>
          <Button type="primary" style={buttonStyle} >Predict</Button>
          </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={8}>
          <Button type="default" style={buttonStyle} icon={<DownloadOutlined />}>Download Predictions</Button>
          </Col>
          </Row>
    </div>
  );
};

export default BatchInference;
