import React, { useState } from "react";
import {
  Col,
  Row,
  Tooltip,
  Button,
  Form,
  Input,
  Spin,
  Alert,
  Modal,
  message,
  Upload,
  Typography
} from "antd";
import {
  EditOutlined,
  SaveOutlined,
  UploadOutlined
} from "@ant-design/icons";
const { Title } = Typography;
function CustomerInfo({setActiveTab}) {
  // Form and state management
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);

  // Hardcoded customer data
  const customerInfo = {
    customerId: "C7283",
    firstName: "William",
    lastName: "Johnson",
    dob: "01/01/1980",
    
  };

  const policyInfo = {
    policyNumber: "C12345",
    policyStartDate: "12/31/2024",
    policyEndDate: "12/31/2025",
    product: "Medical",
    coverageAmount: "40,000",
   
  };

  const agentDetails = {
    agentfirstName: "Mary",
    agentlastName: "Willson",
    agencyName: "XYZ",
    email:"xyz@mail.com"
  };

  const insuranceInfo = {
    objective: "Retirement Planning",
    plan: "Premium Life Protection",
    premiumAmount: "5000",
    term: "20 years"
  };

  const medicalInfo = {
    height: "175",
    weight: "70",
    medicalConditions: "None",
    currentTreatment: "None"
  };

  // Event handlers
  const handleEditToggle = () => {
    if (isEditMode) {
      // Save the form data if needed
      form.validateFields()
        .then(values => {
          // Processing form values if needed
          message.success("Information updated successfully");
        })
        .catch(info => {
          message.error("Please fix the errors before saving");
        });
    }
    setIsEditMode(!isEditMode);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUploadFile = ({ file, fileList }) => {
    setFileList(fileList);
    message.success(`${file.name} uploaded successfully`);
  };

  const onFinish = (values) => {
    console.log('Form submitted with values:', values);
    message.success("Form submitted successfully");
  };

  // New function to handle PDF upload
  const handleUploadPDF = () => {
    // Open the upload modal
    setIsModalOpen(true);
  };

  // New function to handle Fetch button click
  const handleFetch = () => {
    // Get the policy number from the form
    const policyNumber = form.getFieldValue('policyNumber');
    
    // Store the policy number in localStorage to make it available in the next tab
    localStorage.setItem('currentPolicyNumber', policyNumber);
    
    // Navigate to the next tab
    setActiveTab('2'); // Assuming the next tab key is '2'
    
    message.success(`Navigating to details for Policy Number: ${policyNumber}`);
  };

  // Initialize form with hardcoded values
  React.useEffect(() => {
    form.setFieldsValue({
      // Customer Info
      customerId: customerInfo.customerId,
      firstName: customerInfo.firstName,
      lastName: customerInfo.lastName,
      dob: customerInfo.dob,
     
      
      // Policy Info
      policyNumber: policyInfo.policyNumber,
      policyStartDate: policyInfo.policyStartDate,
      policyEndDate: policyInfo.policyEndDate,
      product: policyInfo.product,
      coverageAmount: policyInfo.coverageAmount,
      
      // Agent Info
      agentfirstName: agentDetails.agentfirstName,
      agentlastName: agentDetails.agentlastName,
      agencyName: agentDetails.agencyName,
      email: agentDetails.email,
      
    });
  }, [form]);

  // Shared style objects for consistent UI
  const inputStyle = {
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
  };

  const buttonStyle = {
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div className="customer-info-container" style={{ width: '100%', maxWidth: '100%', margin: '0', padding: '0' }}>
      <Spin spinning={loading}>
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: '16px', width: '100%' }}
          />
        )}

        <Row gutter={[16, 16]}>
          <Col span={22}></Col>
          <Col span={2}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "0.5rem",
              marginTop: "0.5rem",
            }}>
              <Tooltip title={isEditMode ? "Save" : "Edit"}>
                <Button
                  shape="circle"
                  onClick={handleEditToggle}
                  icon={isEditMode ? 
                    <SaveOutlined style={{ fontSize: "20px" }} /> : 
                    <EditOutlined style={{ fontSize: "20px" }} />
                  }
                />
              </Tooltip>
            </div>
          </Col>
        </Row>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ width: '100%' }}
        >
          {/* Customer Info Section */}
          <div style={{ 
            backgroundColor: '#fff', 
            padding: '16px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
            marginBottom: '24px' 
          }}>
            <div style={{ 
              borderBottom: '1px solid #f0f0f0', 
              marginBottom: '16px', 
              paddingBottom: '8px' 
            }}>
              <Title level={4} style={{ color: 'royalblue', marginBottom: 14,}}>Customer Info</Title>
            </div>
            
            <Row gutter={[24, 16]} justify="start" align="top">
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item 
                  label="Customer Id"
                  name="customerId" 
                  rules={[{ required: true, message: 'Please input customer ID' }]}
                >
                  <Input 
                    disabled={!isEditMode} 
                    style={inputStyle} 
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item 
                  label="First Name" 
                  name="firstName" 
                  rules={[{ required: true, message: 'Please input first name' }]}
                >
                  <Input disabled={!isEditMode} style={inputStyle} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item 
                  label="Last Name" 
                  name="lastName" 
                  rules={[{ required: true, message: 'Please input last name' }]}
                >
                  <Input disabled={!isEditMode} style={inputStyle} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item 
                  label="Date of Birth" 
                  name="dob" 
                  rules={[{ required: true, message: 'Please input date of birth' }]}
                >
                  <Input disabled={!isEditMode} style={inputStyle} />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* Policy Info Section */}
          <div style={{ 
            backgroundColor: '#fff', 
            padding: '16px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
            marginBottom: '24px' 
          }}>
            <div style={{ 
              borderBottom: '1px solid #f0f0f0', 
              marginBottom: '16px', 
              paddingBottom: '8px' 
            }}>
              <Title level={4} style={{ color: 'royalblue', marginBottom: 14,}}>Policy Info</Title>
            </div>
            
            <Row gutter={[24, 16]} justify="start" align="top">
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item 
                  label="Policy Number" 
                  name="policyNumber" 
                  rules={[{ required: true, message: 'Please input policy number' }]}
                >
                  <Input disabled={!isEditMode} style={inputStyle} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item 
                  label="Policy Start Date" 
                  name="policyStartDate" 
                  rules={[{ required: true, message: 'Please input policy start date' }]}
                >
                  <Input disabled={!isEditMode} style={inputStyle} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item 
                  label="Policy End Date" 
                  name="policyEndDate"
                >
                  <Input disabled={!isEditMode} style={inputStyle} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item 
                  label="Product" 
                  name="product" 
                  rules={[{ required: true, message: 'Please input product' }]}
                >
                  <Input disabled={!isEditMode} style={inputStyle} />
                </Form.Item>
              </Col>
              
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item 
                  label="Coverage Amount" 
                  name="coverageAmount" 
                  rules={[{ required: true, message: 'Please input coverage amount' }]}
                >
                  <Input 
                    disabled={!isEditMode} 
                    style={inputStyle} 
                    addonBefore="$" 
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* Agent Details Section */}
          <div style={{ 
            backgroundColor: '#fff', 
            padding: '16px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
            marginBottom: '24px' 
          }}>
            <div style={{ 
              borderBottom: '1px solid #f0f0f0', 
              marginBottom: '16px', 
              paddingBottom: '8px' 
            }}>
              
              <Title level={4} style={{ color: 'royalblue', marginBottom: 14,}}>Agent Details</Title>
            </div>
            
            <Row gutter={[24, 16]} justify="start" align="top">
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item 
                  label="Agent First Name" 
                  name="agentfirstName" 
                  rules={[{ required: true, message: 'Please input agent first name' }]}
                >
                  <Input disabled={!isEditMode} style={inputStyle} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item 
                  label="Agent Last Name" 
                  name="agentlastName" 
                  rules={[{ required: true, message: 'Please input agent last name' }]}
                >
                  <Input disabled={!isEditMode} style={inputStyle} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item 
                  label="Agency Name" 
                  name="agencyName" 
                  rules={[{ required: true, message: 'Please input agency name' }]}
                >
                  <Input disabled={!isEditMode} style={inputStyle} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item 
                  label="Email Address" 
                  name="email" 
                  rules={[{ required: true, message: 'Please input email address' }]}
                >
                  <Input disabled={!isEditMode} style={inputStyle} />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <Row gutter={[24, 16]} style={{ marginTop: '24px' }} justify="start" >
            <Col xs={24} sm={6} md={4} lg={3}>
              <Button 
                type="primary" 
                onClick={handleUploadPDF}
                loading={loading}
                size="large"
                style={{ 
                  ...buttonStyle,
                  width: '100%',
                }}
              >
                Upload PDF
              </Button>
            </Col>
            <Col xs={24} sm={6} md={4} lg={3}>
              <Button 
                type="primary" 
                onClick={handleFetch}
                loading={loading}
                size="large"
                style={{ 
                  ...buttonStyle,
                  width: '100%'
                }}
              >
                Fetch
              </Button>
            </Col>
          </Row>
        </Form>
      </Spin>
      
      {/* Upload Modal */}
      <Modal
        title="Upload File"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            OK
          </Button>,
        ]}
        centered
      >
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Upload.Dragger
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleUploadFile}
            multiple={false}
            maxCount={1}
            accept=".pdf"
            showUploadList={true}
            style={{
              padding: "20px",
              border: "2px dashed #1890ff",
              borderRadius: "8px",
            }}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined style={{ fontSize: "40px", color: "#1890ff" }} />
            </p>
            <p className="ant-upload-text">Click or Drag PDF File to Upload</p>
            <p className="ant-upload-hint">
              Only PDF files are allowed.
            </p>
          </Upload.Dragger>
        </div>
      </Modal>
    </div>
  );
}

export default CustomerInfo;