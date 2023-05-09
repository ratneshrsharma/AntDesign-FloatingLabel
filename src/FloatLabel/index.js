import React, { useState } from "react";

import "./floatLabel.css";

const FloatLabel = props => {
  const [focus, setFocus] = useState(false);
  const { children, label, value, required, name } = props;

  const labelClass =
    focus || (value && value.length !== 0) ? "label label-float" : "label";

  return (
    <div
      className="float-label"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {children}
      <label className={labelClass} htmlFor={name}>{label} <span className="required">{required ? "*" : null}</span></label>
    </div>
  );
};

export default FloatLabel;
