import React from "react";
import { render } from "react-dom";
import Example from "./Example";
import ExampleTwo from "./ExampleTwo";
import { Col, Row } from "antd";

const App = () => (
  <Row gutter={60}>
    <Col xs={24} lg={12}>
      <Example />
    </Col>
    <Col xs={24} lg={12}>
      <ExampleTwo />
    </Col>
  </Row>
);

render(<App />, document.getElementById("root"));
