import React, { useState } from "react";
import "./Popup.css";
import Login from '.././login/login';
import { Link } from "react-router-dom";
const Popup = ({ children, id}) => {
  const [isOpen, setIsOpen] = useState(true);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
//   if (!event.target.closest('.target-element')) {
    // code to cancel the action
//   }

  return (
    <>
      {/* <button className="Popup__toggle-button" onClick={togglePopup}>
        Open Popup
      </button> */}
      {isOpen && (
        <div className="Popup">
        { children!==null ?  (<h4 color="black" className="title1">{children}</h4>) : <Login  />  }
          <button className="Popup__close-button" onClick={togglePopup}>
            X
          </button>
        </div>
      )}
    </>
  );
};

export default Popup;
