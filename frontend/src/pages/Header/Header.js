import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Tooltip, Typography } from "antd";
import "./Header.css";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
const { Title } = Typography;
const Header = () => {
    const location = useLocation();
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    
    const isActive = (path) => {
        return location.pathname === path ? "active" : "";
    };

    const toggleMobileMenu = () => {
        setMobileMenuVisible(!mobileMenuVisible);
    };

    const menuItems = (
        <Menu selectedKeys={[location.pathname]}>
            <Menu.Item key="/background">
                <Link to="/background">Background</Link>
            </Menu.Item>
            <Menu.Item key="/individualAdhaar">
                <Link to="/individualAdhaar">Individual Adhaar</Link>
            </Menu.Item>
            <Menu.Item key="/bulkMasking">
                <Link to="/bulkMasking">Bulk Masking</Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <header className="header">
            {/* Left Side - Logo */}
            <div className="logo">
                <img src="/exa.png" alt="Logo" width={150} height={40} />
            </div>
            <Title level={3} style={{ color: "royalblue", textAlign: "center",  }}>
        Insurance ML Workbench
      </Title>
            {/* Navigation Links */}
            {/* <div className="allnav">
                <nav className={`nav-links ${mobileMenuVisible ? 'mobile-visible' : ''}`}>
                    <Link to="/background" className={isActive("/background")}>
                        Background
                    </Link>
                    <Link to="/individualAdhaar" className={isActive("/individualAdhaar")}>
                        Individual Adhaar
                    </Link>
                    <Link to="/bulkMasking" className={isActive("/bulkMasking")}>
                        Bulk Masking
                    </Link>
                </nav>
            </div> */}

            {/* Right Side - Buttons */}
            <div className="header-right">
                <Tooltip title="Login" placement="bottom">
                    <Button 
                        className="login-icon-btn" 
                        type="link" 
                        icon={<UserOutlined />} 
                    />
                </Tooltip>
                <Button type="primary">Sign Up</Button>
                
                {/* Mobile Menu Button */}
                <Button 
                    className="menu-icon" 
                    icon={<MenuOutlined />} 
                    onClick={toggleMobileMenu}
                />
            </div>
        </header>
    );
};

export default Header;