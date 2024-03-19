import React from "react";

const Select = ({ options, defaultValue, value, onChange, className }) => {
  return (
    <select className={className} style={{ textAlign: "right", border: "none" }} value={value} onChange={event => onChange(event.target.value)}>
      <option disabled value="">{defaultValue}</option>
      {options.map(option =>
        <option key={option.value} value={option.value}> {option.name} </option>)}
    </select>
  )
}
export default Select;