import { useEffect, useState } from "react";

export default function RadioInput({ options, onChange }) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  useEffect(() => {onChange(options[0])}, []);
  const optionDivs = options.map((option) => {
    const optionClass = "radio-" + option;
    const classes =
      option === selectedOption
        ? { className: `selected-option radio-option ${optionClass}` }
        : { className: `radio-option ${optionClass}` };
    return (
      <div
        onClick={() => {
          setSelectedOption(option);
          onChange(option);
        }}
        {...classes}
        key={option}
      >
        {option}
      </div>
    );
  });
  return <div className="radio-container">{optionDivs}</div>;
}
