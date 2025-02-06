import React from "react";
import { Button, Select, Card, Layout, Row, Col } from "antd";

const { Option } = Select;
const { Content } = Layout;

const ClaimSeverityUI = () => {
  return (
    <Layout style={{ padding: 20, background: "white", marginLeft: "30px" }}>
      <Row gutter={124}>
        {/* Left Panel */}
        <Col span={8}>
          <div style={{ marginBottom: 20 }}>
            <h3>Choose a Model</h3>
            <Select defaultValue="Claim Severity" style={{ width: "100%",marginBottom: 10,  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", fontSize: "medium", height: "40px" }}>
              <Option value="claimSeverity"  >Claim Severity</Option>
            </Select>
          </div>
          <Button type="default" block style={{ marginBottom: 20, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", fontSize: "medium", height: "40px" }}>
            Upload Train Data
          </Button>
          <Button type="default" block style={{ marginBottom: 20, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", fontSize: "medium", height: "40px" }}>
            Hyperparameters
          </Button>
          <Button type="default" block style={{ marginBottom: 20, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", fontSize: "medium", height: "40px" }}>Cross Validation</Button>
        </Col>

        {/* Right Panel */}
        <Col span={16} >
          <Content>
            <Row gutter={16} >
              <Col span={24}>
                <h3>Train Data</h3>
                <Card style={{ background: "white", color: "#003a8c", width:"400px",boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", fontSize: "medium"  }}>
                  Adj R2– 90%
                </Card>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 20 }}>
              <Col span={24}>
                <h3>Test Data</h3>
                <Card style={{ background: "white", color: "#1890ff", width:"400px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", fontSize: "medium"  }}>
                  Adj R2– 90%
                </Card>
              </Col>
            </Row>
            <Row justify="end" style={{ marginTop: 20 }}>
              <Button type="primary"  size="large">
                Save & Publish
              </Button>
            </Row>
          </Content>
        </Col>
      </Row>
    </Layout>
  );
};

export default ClaimSeverityUI;
