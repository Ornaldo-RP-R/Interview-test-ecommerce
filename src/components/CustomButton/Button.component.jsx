import React from "react";
import "./CustomButon.styles..css";
//I usually use Custom button to give it some effect like ripple it gives to the user more satisfaction
// And if i use i can add some desired class or get a children (like awesome icon or something else) if is needed
const CustomButton = ({ title, desiredClassName, children }) => (
  <button className={`MyButton ${desiredClassName}`}>
    {title}
    {children ? children : null}
  </button>
);
export default CustomButton;
