import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Admin.css'
const Form = () => {
  const [formData, setFormData] = useState("");
  const history = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    history(
      "/adminpanel",
     { state: {password: formData }}
    );
  };

  const handleChange = e => {
    setFormData(e.target.value);
   
  };

  return (
    <div className='admin-checker'>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="textInput"
        onChange={handleChange}
        placeholder="Enter text"
      />
      <button className='button_admin' type="submit">Open AdminPanel</button>
      {/* <Link to="/app">Go to App</Link> */}
    </form>
    </div>
  );
};

export default Form;
