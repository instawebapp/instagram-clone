export default function Input({
  inputType,
  inputClass,
  inputValue,
  ariaLable,
  inputLabel,
  labelClass,
  placeHolder,
  handleChange,
}) {
  return (
    <div className="input_section">
      <label htmlFor={`${inputLabel}`} className={labelClass}>
        {inputLabel}
      </label>
      <input
        aria-label={ariaLable}
        className={`input ${inputClass}`}
        type={inputType}
        placeholder={placeHolder}
        onChange={handleChange}
        value={inputValue === "" ? "" : inputValue}
      />
    </div>
  );
}
