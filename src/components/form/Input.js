export default function Input({
  inputType,
  inputClass,
  inputValue,
  ariaLable,
  inputLabel,
  labelClass,
  handleChange,
  icon,
  iconClass,
}) {
  return (
    <div className="input_section">
      <div className="icon_section">
        <div className={`icon ${iconClass}`}>{icon}</div>
      </div>
      <div className="input_details">
        <input
          aria-label={ariaLable}
          className={`input ${inputClass}`}
          type={inputType}
          onChange={handleChange}
          value={inputValue === "" ? "" : inputValue}
          autoComplete={true}
          required={true}
        />
        <label htmlFor={`input_label ${inputLabel}`} className={labelClass}>
          {inputLabel}
        </label>
      </div>
    </div>
  );
}
