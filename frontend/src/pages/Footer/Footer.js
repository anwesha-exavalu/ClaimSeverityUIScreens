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
      <Row justify="center" gutter={[24, 8]}>  {/* Reduced gutter */}
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div className="footer-content">
            <Title level={4} className="footer-title">  {/* Changed from level 3 to 4 */}
              <span className="footer-title-red">E</span>xavalu
            </Title>
            <Text className="footer-tagline">STRATEGY.TECHNOLOGY.INNOVATION</Text>
            <div className="footer-social">
              <Space size="small">  {/* Changed from middle to small */}
                <LinkedinOutlined className="social-icon" />
                <MailOutlined className="social-icon" />
                <FacebookOutlined className="social-icon" />
                <WhatsAppOutlined className="social-icon" />
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

      <div className="footer-copyright">
        <Text>
          © {new Date().getFullYear()} www.exavalu.com All Rights Reserved.
        </Text>
      </div>
    </Footer>
  );
};

export default CustomFooter;