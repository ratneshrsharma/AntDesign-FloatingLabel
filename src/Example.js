import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "antd";
import debounce from "lodash/debounce";
import InputComponent from './InputComponent/InputComponent';
import FloatLabel from "./FloatLabel";

import "antd/dist/antd.css";
import "./main.css";

const Example = (props) => {
  const [form] = Form.useForm();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectValue, setSelectValue] = useState();
  const [disabled, setDisabled] = useState(true);

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
    localStorage.setItem("Example1", JSON.stringify(data))
  }

  useEffect(() => {
    const getData = localStorage.getItem('Example1') ? JSON.parse(localStorage.getItem('Example1')) : {}
    if (getData) {
      form.setFieldsValue({
        firstName: getData.firstName,
        lastName: getData.lastName,
        phone: getData.phone,
        selectValue: getData.selectValue,
      })
      setFirstName(getData.firstName)
      setLastName(getData.lastName)
      setPhone(getData.phone)
      setSelectValue(getData.selectValue)
    }
  }, [form, localStorage])
  return (
    <div className="example">
      <h3 className="title">Example 1 - Single States</h3>
      <Form form={form} onChange={handleChange} onFinish={handleSubmit} layout="vertical" autoComplete="off" aria-autocomplete="none">
        <Row gutter={20}>
          <Col xs={24} md={12}>
            <FloatLabel label="First Name" name="firstName" value={firstName} required>
              <InputComponent
                name="firstName"
                value={firstName}
                required
                rules={[{ required: true, message: "It can not be blank" }]}
                onChange={(e) => setFirstName(e.target.value)} />
            </FloatLabel>
          </Col>
          <Col xs={24} md={12}>
            <FloatLabel label="Last Name" name="lastName" value={lastName} required>
              <InputComponent
                name="lastName"
                value={lastName}
                required
                rules={[{ required: true, message: "It can not be blank" }]}
                onChange={(e) => setLastName(e.target.value)} />
            </FloatLabel>
          </Col>
          <Col xs={24} md={12}>
            <FloatLabel label="Select Option" name="selectValue" value={selectValue} required>
              <InputComponent
                type="select"
                name="selectValue"
                value={selectValue}
                showSearch
                style={{ width: "100%" }}
                required
                rules={[{ required: true, message: "It can not be blank" }]}
                onChange={(value) => setSelectValue(value)}
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
            <FloatLabel label="Phone no." name="phone" value={phone} required>
              <InputComponent
                name="phone"
                value={phone}
                required
                rules={[{ required: true, message: "It can not be blank" }]}
                onChange={(e) => setPhone(e.target.value)} />
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


export default Example;
