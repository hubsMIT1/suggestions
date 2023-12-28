import React, { useState } from "react";
import './toast.css';

function Toast({toasted}) {

  const [showToast, setShowToast] = useState(false);

//   const handleButtonClick = ( j) => {
    // setShowToast(true);
    
//   };
//   if(toasted){handleButtonClick();}

  return (
    <div>
      {/* <button onClick={handleButtonClick}>Add Task</button> */}
      {/* {showToast && ( */}
        <div className="toast">
          Thank you for your Suggestions. It'll be updated soon after verification!!
        </div>
      {/* )} */}
    </div>
  );
}

export default Toast;
