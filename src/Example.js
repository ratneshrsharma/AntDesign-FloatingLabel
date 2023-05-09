import React, { useState } from "react";
import { Input, TreeSelect, Select } from "antd";

import FloatLabel from "./FloatLabel";

import "antd/dist/antd.css";
import "./main.css";

const { Option } = Select;

const Example = (props) => {
  const [firstName, setFirstName] = useState("Nikhil");
  const [lastName, setLastName] = useState("Mahirrao");
  const [treeValue, setTreeValue] = useState(["0-0-0"]);
  const [selectValue, setSelectValue] = useState();

  const tProps = {
    treeData,
    value: treeValue,
    onChange: (e) => setTreeValue(e),
    treeCheckable: true,
    style: {
      width: "100%"
    }
  };

  return (
    <div className="example">
      <h3>Example</h3>
      <FloatLabel label="First Name" name="firstName" value={firstName}>
        <Input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </FloatLabel>
      <FloatLabel label="Last Name" name="lastName" value={lastName}>
        <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </FloatLabel>
      <FloatLabel label="Tree Select" name="lastName" value={treeValue}>
        <TreeSelect {...tProps} />
      </FloatLabel>
      <FloatLabel label="Select Option" name="name" value={selectValue}>
        <Select
          showSearch
          style={{ width: "100%" }}
          onChange={(value) => setSelectValue(value)}
          value={selectValue}
          mode="tags"
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
          <Option value="jerry">Jerry</Option>
        </Select>
      </FloatLabel>
    </div>
  );
};

const treeData = [
  {
    title: "Node1",
    value: "0-0",
    key: "0-0",
    children: [
      {
        title: "Child Node1",
        value: "0-0-0",
        key: "0-0-0"
      }
    ]
  },
  {
    title: "Node2",
    value: "0-1",
    key: "0-1",
    children: [
      {
        title: "Child Node3",
        value: "0-1-0",
        key: "0-1-0"
      },
      {
        title: "Child Node4",
        value: "0-1-1",
        key: "0-1-1"
      },
      {
        title: "Child Node5",
        value: "0-1-2",
        key: "0-1-2"
      }
    ]
  }
];

export default Example;
