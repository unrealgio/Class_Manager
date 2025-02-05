import React from "react";
import "./Input.module.css";

const Input = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    className="input"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default Input;
