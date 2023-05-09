import React, { useEffect, useState } from "react";

import "./floatLabel.css";

const FloatLabel = props => {
  const [focus, setFocus] = useState(false);
  const { children, label, value, required, name } = props;

  let getValue = ''

  useEffect(() => {
    if (value) { getValue = value }
  }, [value])

  const labelClass =
    focus || ((value || getValue) && (value.length || getValue.length) !== 0) ? "label label-float" : "label";


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
