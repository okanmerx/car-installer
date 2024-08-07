import React, { useState } from 'react';
import { Button, Form, Input, Tabs, Steps, Row, Col } from 'antd';
import CarImageComponent from './CarImageComponent';

const { Step } = Steps;
const { TabPane } = Tabs;

const MainPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [selectedCarType, setSelectedCarType] = useState('Sedan');

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleCarTypeChange = (key) => {
    setSelectedCarType(key);
  };

  const steps = [
    {
      title: 'Start',
      content: (
        <Tabs defaultActiveKey="Sedan" onChange={handleCarTypeChange}>
          <TabPane tab="Sedan" key="Sedan">
            <Button type="primary" onClick={next}>
              Create
            </Button>
          </TabPane>
          <TabPane tab="SUV" key="SUV">
            <Button type="primary" onClick={next}>
              Create
            </Button>
          </TabPane>
          <TabPane tab="Coupe" key="Coupe">
            <Button type="primary" onClick={next}>
              Create
            </Button>
          </TabPane>
        </Tabs>
      ),
    },
    {
      title: 'Form Filling',
      content: (
        <Form form={form} layout="vertical">
          <Form.Item name="carDetails" label="Car Details" rules={[{ required: true, message: 'Please input car details!' }]}>
            <Input placeholder="Car Details" />
          </Form.Item>
          <Form.Item name="personalInfo" label="Personal Info" rules={[{ required: true, message: 'Please input personal info!' }]}>
            <Input placeholder="Personal Info" />
          </Form.Item>
          <Button type="primary" onClick={next}>
            Next
          </Button>
        </Form>
      ),
    },
    {
      title: 'Image Display and Navigation',
      content: (
        <Row>
          <Col span={12}>
            <CarImageComponent carType={selectedCarType} />
          </Col>
          <Col span={12}>
            <div>
              <h3>Initial State</h3>
              <Button type="primary" onClick={prev} style={{ margin: '0 8px' }}>
                Previous
              </Button>
              <Button type="primary" onClick={next}>
                Next
              </Button>
            </div>
          </Col>
        </Row>
      ),
    },
    {
      title: 'Completion',
      content: (
        <div>
          <Button type="primary" onClick={() => console.log('Submit')}>
            Submit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Steps current={currentStep}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content" style={{ padding: '20px' }}>{steps[currentStep].content}</div>
    </div>
  );
};

export default MainPage;