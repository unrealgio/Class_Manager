import React from "react";
import "./Button.module.css";

const Button = ({ text, onClick, type = "button" }) => (
  <button className="button" onClick={onClick} type={type}>
    {text}
  </button>
);

export default Button;
