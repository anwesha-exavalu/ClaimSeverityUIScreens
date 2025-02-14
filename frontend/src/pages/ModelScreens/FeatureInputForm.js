import React from "react";
import { Form, Input, Select, Button, Row, Col } from "antd";

const { Option } = Select;

const FeatureInputForm = ({ setActiveTab }) => {
    const onFinish = (values) => {
        console.log("Form Values:", values);
        setActiveTab("2"); // Navigate to Model Info tab
      };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Row gutter={100}>
        <Col span={10}>
          <Form.Item label="Fare" name="fare" rules={[{ required: true }]}> 
            <Input type="number"  style={{  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}/>
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item label="No. of Parents plus Children on Board" name="parents_children" rules={[{ required: true }]}> 
            <Input type="number"  style={{  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}/>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={100}>
        <Col span={10}>
          <Form.Item label="Age" name="age" rules={[{ required: true }]}> 
            <Input type="number"  style={{  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}/>
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item label="Gender" name="gender" rules={[{ required: true }]}> 
            <Select  style={{  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={100}>
        <Col span={10}>
          <Form.Item label="Passenger Class" name="passengerClass" rules={[{ required: true }]}> 
            <Input type="number"  style={{  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}/>
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item label="Deck" name="deck" rules={[{ required: true }]}> 
            <Select  style={{  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
              {["A", "B", "C", "D", "E", "F", "G", "T"].map((deck) => (
                <Option key={deck} value={deck}>{deck}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={100}>
        <Col span={10} >
          <Form.Item label="No. of Siblings plus Spouses on Board" name="siblings_spouses" rules={[{ required: true }]} > 
            <Input type="number" style={{  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}/>
          </Form.Item>
        </Col>
        <Col span={10} >
          <Form.Item label="Embarked" name="embarked" rules={[{ required: true }]} > 
            <Select  style={{  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)" }}>
              <Option value="Southampton">Southampton</Option>
              <Option value="Cherbourg">Cherbourg</Option>
              <Option value="Queenstown">Queenstown</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row justify="space-between">
        <Col>
          <Button type="primary" htmlType="submit" style={{  width: "100px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>Predict</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FeatureInputForm;
