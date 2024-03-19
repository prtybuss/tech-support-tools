import React from "react";

const Button = ({ children, className, ...props }) => {
  return (
    <button {...props} className={className}>
      {children}
    </button>
  )
}

export default Button;