import React from "react";
import "../css/button.css";

const Button = ({ text, className, ...rest }) => {
  return (
    <button className={`btn ${className}`} {...rest}>
      {text}
    </button>
  );
};

export default Button;
