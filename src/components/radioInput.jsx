import { useState } from "react";

export default function RadioInput({options}) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const optionDivs = options.map((option) => 
    {
      const optionClass = 'radio-' + option;
      const classes = (option === selectedOption ? {className: `selected-option radio-option ${optionClass}`} : {className: `radio-option ${optionClass}`});
      return <div onClick={()=> setSelectedOption(option)} {...classes} key={option}>{option}</div>
  }
  );
  return (
    <div className="radio-container">{optionDivs}</div>
  );
}