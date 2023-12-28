import React from "react";
import "./Alert.css";

const Alert = ({ message, type }) => {
  return (
    <div className={`Alert Alert--${type}`}>
      <p className="Alert__message">{message}</p>
    </div>
  );
};

export default Alert;
