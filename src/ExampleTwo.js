import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "antd";
import debounce from "lodash/debounce";
import InputComponent from './InputComponent/InputComponent';
import FloatLabel from "./FloatLabel";

import "antd/dist/antd.css";
import "./main.css";

const ExampleTwo = (props) => {
  const [form] = Form.useForm();
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [selectValue, setSelectValue] = useState();
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    selectValue: []
  });

  const handleChange = debounce(() => {
    form
      .validateFields()
      .then((d) => {
        setDisabled(false);
      })
      .catch((d) => {
        setDisabled(true);
      });
  }, 500);

  const handleSubmit = (data) => {
    console.log("get data", data);
    localStorage.setItem("Example2", JSON.stringify(data))
  }

  useEffect(() => {
    const getData = localStorage.getItem('Example2') ? JSON.parse(localStorage.getItem('Example2')) : {}
    if (getData) {
      form.setFieldsValue({
        firstName: getData.firstName,
        lastName: getData.lastName,
        phone: getData.phone,
        selectValue: getData.selectValue,
      })
      setFormData({
        firstName: getData.firstName,
        lastName: getData.lastName,
        phone: getData.phone,
        selectValue: getData.selectValue
      })
    }
  }, [form, localStorage])

  console.log("formData", formData);
  return (
    <div className="example">
      <h3 className="title">Example 2</h3>
      <Form form={form} onChange={handleChange} onFinish={handleSubmit} layout="vertical">
        <Row gutter={20}>
          <Col xs={24} md={12}>
            <FloatLabel label="First Name" name="firstName" value={formData.firstName} required>
              <InputComponent
                name="firstName"
                value={formData.firstName}
                required
                rules={[{ required: true, message: "It can not be blank" }]}
                onChange={(e) => setFormData({ firstName: e.target.value })} />
            </FloatLabel>
          </Col>
          <Col xs={24} md={12}>
            <FloatLabel label="Last Name" name="lastName" value={formData.lastName} required>
              <InputComponent
                name="lastName"
                value={formData.lastName}
                required
                rules={[{ required: true, message: "It can not be blank" }]}
                onChange={(e) => setFormData({ lastName: e.target.value })} />
            </FloatLabel>
          </Col>
          <Col xs={24} md={12}>
            <FloatLabel label="Select Option" name="selectValue" value={formData.selectValue} required>
              <InputComponent
                type="select"
                name="selectValue"
                value={formData.selectValue}
                showSearch
                style={{ width: "100%" }}
                required
                rules={[{ required: true, message: "It can not be blank" }]}
                onChange={(value) => setFormData({ selectValue: value })}
                mode="tags"
                options={{
                  values: [
                    { id: 1, name: "Complaint / Enquiry" },
                    { id: 2, name: "Comment" },
                    { id: 3, name: "Feedback" },
                    { id: 4, name: "Suggestion" },
                    { id: 5, name: "Appreciation" },
                    { id: 6, name: "Other" },
                  ],
                  value_key: "id",
                  text_key: "name",
                }}
              />
            </FloatLabel>
          </Col>
          <Col xs={24} md={12}>
            <FloatLabel label="Phone no." name="phone" value={formData.phone} required>
              <InputComponent
                name="phone"
                value={formData.phone}
                required
                rules={[{ required: true, message: "It can not be blank" }]}
                onChange={(e) => setFormData({ phone: e.target.value })} />
            </FloatLabel>
          </Col>

          <Col xs={24} md={12}>
            <Button type="primary" htmlType="submit" disabled={disabled}>Send</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};


export default ExampleTwo;
