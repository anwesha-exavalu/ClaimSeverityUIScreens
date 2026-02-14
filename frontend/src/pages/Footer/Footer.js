import React from "react";
import { Layout, Row, Col, Typography, Space } from "antd";
import {
  FacebookOutlined,
  LinkedinOutlined,
  MailOutlined,
  WhatsAppOutlined,
  PhoneFilled,
} from "@ant-design/icons";
import "./Footer.css";

const { Footer } = Layout;
const { Title, Text } = Typography;

const CustomFooter = () => {
  return (
    <Footer className="custom-footer">
      <Row gutter={[24, 8]}>
        {/* Left side - Title and Tagline */}
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <div className="footer-content">
            <Title level={4} className="footer-title">
              <span className="footer-title-red">E</span>xavalu
            </Title>
            <Text className="footer-tagline">STRATEGY.TECHNOLOGY.INNOVATION</Text>
          </div>
        </Col>
        
        {/* Right side - Social icons and contact */}
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <div className="footer-content footer-right">
            <div className="footer-social">
              <Space size="small">
                <LinkedinOutlined className="social-icon" />
                <MailOutlined className="social-icon" />
                {/* <FacebookOutlined className="social-icon" />
                <WhatsAppOutlined className="social-icon" /> */}
              </Space>
            </div>
            <div className="footer-contact">
              <Text>
                <PhoneFilled className="phone-icon" />
                +1- 888-EXAVALU (888-392-8258) info@exavalu.com
              </Text>
            </div>
          </div>
        </Col>
      </Row>
      
      {/* Copyright in the middle */}
      <Row justify="center">
        <Col>
          <div className="footer-copyright">
            <Text>
              © {new Date().getFullYear()} www.exavalu.com All Rights Reserved.
            </Text>
          </div>
        </Col>
      </Row>
    </Footer>
  );
};

export default CustomFooter;